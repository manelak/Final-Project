const {check,validationResult} = require ('express-validator');

exports.registerRules=()=>[
    check('email',"This Field Is Required").notEmpty(),
    check('email',"This Field must be a Valid email").isEmail(),
    check('password',"This Field Is Required").notEmpty(),
    check('password',"This Field Must Haves At Leats 6 Char").isLength({min:6}),
]

exports.validator=(req,res,next)=>{
    const errors=validationResult(req);
    errors.isEmpty()?next():res.status(400).send({errors:errors.array()});
}