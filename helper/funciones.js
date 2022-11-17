import nodemailer from 'nodemailer';


const generarId = () =>
    Math.random().toString(32).substring(2) + Date.now().toString(32);



const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ebbbc1e3e896c1",
        pass: "a91b8357927634"
    }
});
  
const enviarCorreo = async (usuario) =>{

    //desestructiramos el objeto "usuario" para manejar los valores individualmente, así no tenemos que hacer refrenceia al objeto
    const {nombre, contrasena, correo, token} = usuario;

    await transport.sendMail({
      //generamos el cuerpo del mail
        from: 'proyectonodejs@developer.com',
        sender: 'Daniel Ospina Quiceno',
        to: correo,
        subject: "Creación de usuario",
        html:
    `
        <h1>Bienvenido a Desarrollo con node</h1>
        <h2>Hola ${nombre} </h2>
        <p>Instrucciones de activación de cuenta: </p>
        <ul>
            <li>Correo: ${correo}</li>
            <li>Contraseña: ${contrasena}</li>
            <li></li>
        </ul>
        <p>Para activar tu cuenta por favbor dar click en el siguiente enlace</p>
        <p><a href="http://localhost:3000/auth/confirmarUsuario/${token}">Activar cuenta</a></p>
    `
    });
}  

export {generarId, enviarCorreo}