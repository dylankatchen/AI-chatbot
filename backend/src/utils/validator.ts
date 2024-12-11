import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req,res,next) => {
        for(let validation of validations){
            const result = await validation.run(req)
            if(!result.isEmpty())
            {
                break;
            }
        }
        const errors = validationResult(req)
        if(errors.isEmpty())
        {
            return next()
        }
        return res.status(422).json({errors: errors.array()})
    }
}

export const loginValidator = [
    body("email").trim().isEmail().withMessage("email is required"),
    body("password").trim().isLength({min : 6}).withMessage("password should have atleast 6 characters")
]

export const signupValidator = [
    body("name").notEmpty().withMessage("name is required"),
   ...loginValidator,
]

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),

]

