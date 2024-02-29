import yup from "yup";

export const shipmentSchema = yup.object({
    senderName: yup.string().required(),
    senderAddress: yup.string().required(),
    recipientName: yup.string().required(),
    recipientAddress: yup.string().required(),
    details: yup.string().required()
   
});

export const uuidSchema = yup.string().uuid().required();
