import { Router } from "express"
import AuthController from "@/authentication/auth.controller"
import { validateMidleware } from '@/middlewares/validation.midleware'
import { userRegistrationSchema,userSigninSchema, userUpdateSchema, userDeleteSchema} from '@/schema/user.schema'


class AuthRoutes {
  router = Router()
  controller = new AuthController()

  constructor() {
    this.intializeRoutes()
  }

  intializeRoutes() {
    this.router.get("/", this.controller.findAll)
    this.router.post("/", validateMidleware(userRegistrationSchema), this.controller.create)
    this.router.post("/sign-in", validateMidleware(userSigninSchema), this.controller.signIn)
    this.router.put("/", validateMidleware(userUpdateSchema), this.controller.update)
    this.router.delete("/", validateMidleware(userDeleteSchema), this.controller.delete)
  }
}

export default new AuthRoutes().router
