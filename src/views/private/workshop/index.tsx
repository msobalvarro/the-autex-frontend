import { ClientView } from '@/views/private/clients'
import { VehiculesView } from '@/views/private/vehicules'
import { UserList } from '@/component/user/userList'
import { useAuth } from '@/hooks/auth'
import { PresentationWorkshopCard } from '@/component/workshop/presentationCard'

export const WorkshopView = () => {
  const { auth } = useAuth()

  return (
    <div className='flex gap-4 flex-col items-center w-full px-10'>
      <PresentationWorkshopCard />
      {auth?.isAdmin && (
        <UserList />
      )}

      <ClientView />
      <VehiculesView />
    </div>
  )
}