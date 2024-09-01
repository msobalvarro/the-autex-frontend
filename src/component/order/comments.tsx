import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  label: string;
  onAdd: (value: string) => void
  textButton?: string
}

export const Comments = ({ label, onAdd, textButton }: Props) => {
  const [comment, setComment] = useState<string>('')

  const submit = () => {
    try {
      if (comment.trim().length < 3) {
        'Ingresa un comentario válido'
      }

      onAdd(comment)
      setComment('')
    } catch (error: any) {
      toast.error(String(error));
    }

  }

  return (
    <div className='flex flex-col gap-4 border p-4 rounded transition hover:shadow-md'>
      <textarea
        value={comment}
        onChange={({ currentTarget }) => setComment(currentTarget.value)}
        className='focus:outline-none'
        placeholder={label} />

      {comment.length > 0 && (
        <button
          onClick={submit}
          className='hover:bg-gray-500 self-end py-2 px-4 rounded bg-gray-600 text-white'>
          {textButton || 'Agregar'}
        </button>
      )}
    </div>
  )
}