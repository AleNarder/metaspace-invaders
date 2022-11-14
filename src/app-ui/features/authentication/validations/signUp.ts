import { object, string } from "yup"

export default object({
    firstname: string().required().nullable().min(2),
    lastname:  string().required().nullable().min(2),
    email:     string().required().nullable().email()
})