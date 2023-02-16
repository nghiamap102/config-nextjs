import { validateRequired } from "@utils/validations"

const validateFields = {
  text_1: [
    {
      validator: validateRequired,
      code: 'Verify is required'
    }
  ],
  text_2: [
    {
      validator: validateRequired,
      code: 'Verify is required'
    }
  ],
  text_3: [
    {
      validator: validateRequired,
      code: 'Verify is required'
    }
  ],
  text_4: [
    {
      validator: validateRequired,
      code: 'Verify is required'
    }
  ],
  text_5: [
    {
      validator: validateRequired,
      code: 'Verify is required'
    }
  ],
  text_6: [
    {
      validator: validateRequired,
      code: 'Verify is required'
    }
  ]
}

export default validateFields
