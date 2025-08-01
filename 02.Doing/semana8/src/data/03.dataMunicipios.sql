USE semana8_db;

SET @estadoId = (SELECT id FROM estados WHERE nombre='Aguascalientes');

INSERT INTO municipios (nombre,estado_id)
VALUES
('Aguascalientes',(@estadoId)),
('Asientos' , (@estadoID)),
('Calvillo' , (@estadoID)),
('Cosío' , (@estadoID)),
('El Llano' , (@estadoID)),
('Jesús María' , (@estadoID)),
('Pabellón de Arteaga' , (@estadoID)),
('Rincón de Romos' , (@estadoID)),
('San Francisco de los Romo' , (@estadoID)),
('San José de Gracia' , (@estadoID)),
('Tepezalá' , (@estadoID));


SELECT e.id as IdEstado, e.nombre as Estado,
m.id as IdMunicipio,
m.nombre as Municipio
FROM estados e INNER JOIN
	municipios m ON e.id=m.estado_id
WHERE m.nombre LIKE '%as%';


