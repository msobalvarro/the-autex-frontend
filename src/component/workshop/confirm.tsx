import { User } from '@/interfaces'
import { CustomModal, ModalMinimalProps } from '../modals/layout'
import { MdDelete } from 'react-icons/md'
import { FaTrashRestore } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { axiosInstance } from '@/utils/http'
import { Endpoints } from '@/router'



interface Props extends ModalMinimalProps {
  user: User
}

export const ConfirmAtiveToggleModal = ({ user, setOpen, onUpdate }: Props) => {
  const { status } = user

  const submit = async () => {
    try {
      const {data, status} = await axiosInstance.put(Endpoints.UPDATE_USER_STATUS, {
        userId: user._id,
        status: user.status === 'active' ? 'inactive' : 'active',
      })

      if (status !== 200) {
        throw new Error(data)
      }

      onUpdate?.()
      toast.info('Estado actualizado')
      setOpen(false)
    } catch (error) {
      toast.error(String(error))
    }
  }

  return (
    <CustomModal
      title={`${user.status === 'active' ? 'Desactivar' : 'Activar'} ${user.name}`}
      small
      isOpen
      iconComponent={user.status === 'active' ? <MdDelete /> : <FaTrashRestore />}
      navButtonsOptions={{
        renderNext: false,
        renderBack: false,
        renderConfirmDelete: status === 'active',
        isFinally: status === 'blocked' || status === 'inactive',
        createText: 'Activar',
        deleteText: 'Desactivar',
        onDelete: submit,
        onSuccess: submit,
      }}
      setOpen={setOpen}>
      <p className='text-gray-600'>
        ¿Estás seguro de que deseas {user.status === 'active' ? 'desactivar' : 'activar'} el usuario de {user.name}?
      </p>
    </CustomModal>
  )
}