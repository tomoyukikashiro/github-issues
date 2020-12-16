import { useFieldArray, UseFormMethods, ArrayField } from 'react-hook-form'
import { ReactElement, useEffect } from 'react'

const QueryForm = ({
  query,
  queryIndex,
  control,
  register,
  errors,
}: {
  query: Partial<ArrayField>
  queryIndex: number
  control: UseFormMethods['control']
  register: UseFormMethods['register']
  errors: UseFormMethods['errors']
}): ReactElement => {
  const { fields, append } = useFieldArray({
    control,
    name: `queries[${queryIndex}].queryString`,
    keyName: 'key',
  })
  const addQueryString = () => {
    append({ value: '' })
  }
  useEffect(() => {
    append({ value: '' })
  }, [])

  return (
    <>
      <h3>QueryForm</h3>
      <input
        placeholder="Query Name"
        type="text"
        name={`queries[${queryIndex}].name`}
        defaultValue={query.name}
        ref={register({ required: true })}
      />
      {errors.name && <p>名前を入力ください。</p>}
      <input
        type="hidden"
        name={`queries[${queryIndex}].id`}
        defaultValue={query.id}
        ref={register()}
      />
      {fields.map((queryString, queryStringIndex) => (
        <input
          placeholder="Query String"
          type="text"
          name={`queries[${queryIndex}].queryString[${queryStringIndex}].value`}
          key={queryString.key}
          ref={register}
          defaultValue={queryString.value}
        />
      ))}
      <button type="button" onClick={addQueryString}>
        Add Query String
      </button>
    </>
  )
}

export default QueryForm
