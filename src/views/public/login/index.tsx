import { InputField } from '@/component/input'

export const LoginView = () => {
  return (
    <div className='bg-gray-800 flex justify-center items-center h-full'>
      <div className='p-6 w-1/3'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
          Ingresa a tu cuenta
        </h1>

        <form className='flex flex-col gap-8 mt-8' action='#'>
          <label className='flex flex-col'>
            <span className='text-white'>Correo Electrónico</span>
            <InputField placeholder='ingrese su correo electrónico' />
          </label>

          <label className='flex flex-col'>
            <span className='text-white'>Contraseña</span>
            <InputField placeholder='Tu contraseña' />
          </label>

          <button type='submit' className='p-2 rounded-md bg-gray-700 hover:bg-gray-900 text-white'>Sign in</button>
        </form>
      </div>
    </div>
  )
}