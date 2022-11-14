import { InferType, object, string } from "yup"

export default object({
    email:     string().required().nullable().email().label("Email"),
    password:  string().required().nullable().min(2).label("Password")
})
