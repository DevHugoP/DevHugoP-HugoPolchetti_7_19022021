INSERT INTO users (username, password, email, isAdmin,createdAt, updatedAt) VALUES
('hugo','$2a$04$mugAI8ubmutmTzJ7hO0.DuoG.omY2PCmW9w6CET1DOgftKmzOy6wO' ,'hugo@hugo.com',1 ,'2021-04-12 15:39:00' ,'2021-04-12 15:40:00'), /* mot de passe  = hugo*/
('denis','$2a$04$VJgmjzaHwOMUAFF8Wxv1ouHvBTBGSTYj7a7uT17QTSqxMLI1d8aJ2' ,'denis@denis.com',0 ,'2021-04-12 15:40:01' ,'2021-04-12 15:40:02'); /* mot de passe  = denis*/
INSERT INTO messages (userId, title, content, attachement, createdAt, updatedAt) VALUES
(1 ,'Je decouvre le reseau' ,"Je poste mon premier message ici  voilà une sauce que j'apprecie !" , "http://localhost:5000/images/22589-0w470h470_Sauce_Piquante_Sriracha_Huy_Fong.jpg1618242524087.jpg" ,'2021-04-12 15:41:32', '2021-04-12 15:41:32' );
(2 ,'voilà ma sauce maison' ,"cette sauce piquante est vraiment forte !" ,"http://localhost:5000/images/tabasco-original-red-pepper-sauce.jpg1618391729248.jpg" ,'2021-04-12 15:41:32', '2021-04-12 15:41:32' );
INSERT INTO comments (userId, messageId, content, createdAt, updatedAt) VALUES 
(2 ,1 ,"Salut hugo c'est jean dans les commentaire cette sauce est incroyable ! " ,'2021-04-12 15:42:30', '2021-04-12 15:42:30' );

