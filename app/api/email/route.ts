import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const send_email = async (data: { name: string; email: string; message: string }): Promise<void> => {
  try {
    // Ajoutez la propriété 'to' ici (adresse e-mail du tatoueur)
    const tatoueurEmail = process.env.EMAIL_SUBJECT;

    // Ajoutez la propriété 'to' à l'objet de données
    const dataWithTo = { ...data, to: tatoueurEmail };

    // Enregistrez le message de contact dans la base de données avec Prisma
    await prisma.contactMessage.create({
      data: {
        name: dataWithTo.name,
        email: dataWithTo.email,
        message: dataWithTo.message,
      },
    });

    // Configurer le contenu de l'e-mail
    const emailContent = {
      to: process.env.EMAIL_SUBJECT,
      subject: 'Nouveau message de contact',
      text: `Nom: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    };

    // Créer les en-têtes de la requête
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': process.env.RESEND_API_KEY || '', // Remplacez par votre token ReSend
    });

    // Envoyer l'e-mail avec ReSend en utilisant fetch
    await fetch('https://api.resend.io/v1/email/send', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(emailContent),
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail au tatoueur', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default send_email;
