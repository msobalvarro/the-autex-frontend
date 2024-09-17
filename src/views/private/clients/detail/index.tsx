import { ClientReporter } from '@/component/client/clientReport'
import { ClientInformation } from '@/component/ui/clientInformation'
import { Loader } from '@/component/ui/loader'
import { useAxios } from '@/hooks/fetch'
import { PropsQueryId } from '@/interfaces'
import { Endpoints } from '@/router'
import { useParams } from 'react-router-dom'

export const DetailClientView = () => {
  const { id }: PropsQueryId = useParams()
  const { data, loading } = useAxios({
    endpoint: Endpoints.GET_CLIENT_BY_ID.replace(':id', String(id))
  })

  if (loading) return <Loader active />
  if (!data && !loading) {
    return <p className='text-xl text-hray-400'>No se encontraron resultados</p>
  }

  if (data) {
    return (
      <div className='flex items-start gap-8 p-10 w-full'>
        <ClientInformation client={data} />
        <ClientReporter client={data} />
      </div>
    )
  }

  return null
}