import { useAxios } from '@/hooks/fetch'
import { Endpoints } from '@/router'
import { CustomModal, ModalMinimalProps } from './layout'
import { Loader } from '../ui/loader'
import { ActivitiesGroupPropierties } from '@/interfaces'
import { ActivityItem } from '../estimate/activityItem'
import { FaTasks } from 'react-icons/fa'

export const ActivitiesGroupPreviewModal = ({ setOpen }: ModalMinimalProps) => {
  const { data, loading } = useAxios({ endpoint: Endpoints.GET_ACTIVITIES_GROUP })
  const customData: ActivitiesGroupPropierties[] | null = Array.isArray(data) ? [...data] : null

  return (
    <CustomModal
      isOpen
      small
      title='Grupos de Servicio'
      subTitle='Gestiona, imprime tus grupos de servicio'
      setOpen={setOpen}
      hiddenButtons
      iconComponent={<FaTasks />}
      containerClassesNames='flex flex-col gap-8'>
      <>
        <div className='grid grid-cols-1 gap-4'>
          {customData !== null && customData.map(item => <ActivityItem activity={item} />)}
        </div>

        <Loader active={loading} />
      </>
    </CustomModal>
  )
}