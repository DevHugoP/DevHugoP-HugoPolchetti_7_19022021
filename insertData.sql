INSERT INTO users (username, password, email, isAdmin,createdAt, updatedAt) VALUES
('hugo','$2a$04$mugAI8ubmutmTzJ7hO0.DuoG.omY2PCmW9w6CET1DOgftKmzOy6wO' ,'hugo@hugo.com',1 ,'2021-04-12 15:39:00' ,'2021-04-12 15:40:00'), /* mot de passe  = hugo*/
('denis','$2a$04$VJgmjzaHwOMUAFF8Wxv1ouHvBTBGSTYj7a7uT17QTSqxMLI1d8aJ2' ,'denis@denis.com',0 ,'2021-04-12 15:40:01' ,'2021-04-12 15:40:02'); /* mot de passe  = denis*/
INSERT INTO messages (userId, title, content, attachement, createdAt, updatedAt) VALUES
(1 ,'Je decouvre le reseau' ,"Je poste mon premier message ici sans photo mais j'en rajouterais surement une plus tard " ,null ,'2021-04-12 15:41:32', '2021-04-12 15:41:32' );
INSERT INTO comments (userId, messageId, content, createdAt, updatedAt) VALUES 
(2 ,1 ,"Salut hugo c'est jean les commentaire j'ai l'impression que tout fonctionne j'ai hate de voir ta photo ! " ,'2021-04-12 15:42:30', '2021-04-12 15:42:30' );

