import { object, string } from "yup"

export default object({
    email:     string().required().nullable().email(),
    password:  string().required().nullable().min(2)
})