import { FC } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { generateQuery, WorkSpaceData } from '../../lib/workSpaceData'
import QueryForm from '../query/QueryForm'

import {
  toQueryForm,
  workSpaceForm2WorkSpace,
  WorkSpaceFormData,
  toWorkSpaceForm,
} from '../../lib/workSpaceFormData'

type Props = {
  workSpace: WorkSpaceData
  setWorkSpace: (workSpace: WorkSpaceData) => void
}

const WorkSpaceForm: FC<Props> = ({ workSpace, setWorkSpace }) => {
  const isNew = !workSpace.name
  const serializedWorkSpace = toWorkSpaceForm(workSpace)
  const { control, register, handleSubmit, getValues, errors } = useForm({
    defaultValues: serializedWorkSpace,
  })
  const { fields, append } = useFieldArray({
    control,
    name: 'queries',
    keyName: 'key',
  })

  const onSubmit = (data: WorkSpaceFormData) => {
    data.queries.forEach((query) => {
      query.queryString = query.queryString.filter(
        (queryString) => !!queryString.value
      )
    })
    data.queries = data.queries.filter(
      (query) => query.name && query.queryString.length
    )
    const workSpace = workSpaceForm2WorkSpace(data)
    setWorkSpace(workSpace)
  }

  const addQuery = () => {
    append(toQueryForm(generateQuery()))
  }

  return (
    <>
      <h2>WorkSpaceForm</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <button>{isNew ? 'Create' : 'Update'}</button>
        </div>
        <input
          placeholder="WorkSpace Name"
          type="text"
          name="name"
          ref={register({ required: true })}
          defaultValue={getValues('name')}
        />
        {errors.name && <p>名前を入力ください。</p>}
        <input
          type="hidden"
          name="id"
          ref={register()}
          defaultValue={getValues('id')}
        />
        {fields.map((query, index) => (
          <QueryForm
            key={query.key}
            query={query}
            queryIndex={index}
            {...{ control, register, errors }}
          />
        ))}
        <button type="button" onClick={addQuery}>
          Add Query
        </button>
      </form>
    </>
  )
}

export default WorkSpaceForm
