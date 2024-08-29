import { InputField } from '@/component/input'
import { Loader } from '@/component/loader'
import { ResponseAuth } from '@/interfaces'
import { Endpoints, routes } from '@/router'
import { setSession } from '@/utils/auth'
import { axiosInstance } from '@/utils/http'
import { useState } from 'react'
import { useNavigate, } from 'react-router-dom'
import { toast } from 'react-toastify'

export const LoginView = () => {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const submit = async () => {
    setLoading(true)

    try {
      const { data, status } = await axiosInstance.post<ResponseAuth>(Endpoints.LOGIN, {
        email,
        password
      })

      if (status !== 200) {
        throw new Error('Error en iniciar sesión')
      }

      await setSession(data)
      navigate(routes.ORDER_SERVICE)
    } catch (error) {
      toast.error(String(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-gray-800 w-full flex flex-1 justify-center items-center absolute h-full'>
      <div className='p-6 w-1/3 flex flex-col gap-8'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          Ingresa a tu cuenta
        </h1>

        <label className='flex flex-col'>
          <span className='text-white'>Correo Electrónico</span>
          <InputField
            value={email}
            onChange={({ currentTarget }) => setEmail(currentTarget.value)}
            placeholder='ingrese su correo electrónico' />
        </label>

        <label className='flex flex-col'>
          <span className='text-white'>Contraseña</span>
          <InputField
            value={password}
            type='password'
            onChange={({ currentTarget }) => setPassword(currentTarget.value)}
            placeholder='Tu contraseña' />
        </label>

        <button onClick={submit} className='p-2 rounded-md bg-gray-700 hover:bg-gray-900 text-white'>Sign in</button>

        <Loader active={isLoading} />
      </div>
    </div>
  )
}