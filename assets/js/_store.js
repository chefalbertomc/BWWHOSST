
const STORE_KEY = 'ADANYEVA_DATA_V3';

// --- GLOBAL MENU DATA ---
// Moved outside so GENERATE_DATA can access it for realistic history
const MENU_DATA = {
    alimentos: [
        // PARA COMPARTIR
        { id: 'F001', name: 'Dip Duo', category: 'Para Compartir', available: true, price: 189 },
        { id: 'F002', name: 'Corn Riblets', category: 'Para Compartir', available: true, price: 149 },
        { id: 'F003', name: 'Mozzarella Sticks', category: 'Para Compartir', available: true, price: 169 },
        { id: 'F004', name: 'Onion Rings Basket', category: 'Para Compartir', available: true, price: 129 },
        { id: 'F005', name: 'Jalapeño Pepper Bites', category: 'Para Compartir', available: true, price: 159 },
        { id: 'F006', name: 'Chicken Quesadilla', category: 'Para Compartir', available: true, price: 199 },
        { id: 'F007', name: 'Potato Wedges', category: 'Para Compartir', available: true, price: 119 },
        { id: 'F008', name: 'Spicy Cheese Bites', category: 'Para Compartir', available: true, price: 149 },
        { id: 'F009', name: 'Loaded Potato Wedges', category: 'Para Compartir', available: true, price: 179 },
        { id: 'F010', name: 'French Fries Basket', category: 'Para Compartir', available: true, price: 99 },

        // SAMPLERS & COMBOS
        { id: 'F020', name: 'House Sampler', category: 'Samplers', available: true, price: 349 },
        { id: 'F021', name: 'All Sports Pack', category: 'Samplers', available: true, price: 399 },
        { id: 'F022', name: 'Ultimate Nachos con Chili', category: 'Samplers', available: true, price: 229 },
        { id: 'F023', name: 'Loaded BBQ Pork Nachos', category: 'Samplers', available: true, price: 249 },
        { id: 'F024', name: 'Mix and Match', category: 'Samplers', available: true, price: 299 },

        // BURGERS
        { id: 'F030', name: 'Stadium Burger', category: 'Burgers', available: true, price: 189 },
        { id: 'F031', name: 'Smoky Guacamole Burger', category: 'Burgers', available: true, price: 209 },
        { id: 'F032', name: 'Chili Burger', category: 'Burgers', available: true, price: 199 },
        { id: 'F033', name: 'Classic Cheeseburger', category: 'Burgers', available: true, price: 179 },
        { id: 'F034', name: 'Barbacoa Burger', category: 'Burgers', available: true, price: 219 },
        { id: 'F035', name: 'Wild Bacon Burger', category: 'Burgers', available: true, price: 229 },
        { id: 'F036', name: 'Big Jack Daddy Burger', category: 'Burgers', available: true, price: 249 },

        // SANDWICHES
        { id: 'F040', name: 'Chipotle Chicken Sandwich', category: 'Sandwiches', available: true, price: 179 },
        { id: 'F041', name: 'Buffalo Ranch Crispy Chicken Sandwich', category: 'Sandwiches', available: true, price: 189 },
        { id: 'F042', name: 'Buffalo Ranch Grilled Chicken Sandwich', category: 'Sandwiches', available: true, price: 189 },

        // PLATILLOS
        { id: 'F050', name: 'Crispy Tenders (3 pzas)', category: 'Platillos', available: true, price: 149 },
        { id: 'F051', name: 'Crispy Tenders (5 pzas)', category: 'Platillos', available: true, price: 199 },
        { id: 'F052', name: 'Grilled Tenders (3 pzas)', category: 'Platillos', available: true, price: 159 },
        { id: 'F053', name: 'Grilled Tenders (5 pzas)', category: 'Platillos', available: true, price: 209 },
        { id: 'F054', name: 'Grilled & Crispy Tenders Combo', category: 'Platillos', available: true, price: 219 },
        { id: 'F055', name: 'Ribs and Wings Combo', category: 'Platillos', available: true, price: 349 },
        { id: 'F056', name: 'Ribs and Boneless Combo', category: 'Platillos', available: true, price: 329 },
        { id: 'F057', name: 'Buffalo Mac & Cheese', category: 'Platillos', available: true, price: 169 },
        { id: 'F058', name: 'BBQ Pork & Corn Burlets', category: 'Platillos', available: true, price: 189 },

        // ENSALADAS
        { id: 'F060', name: 'Chicken Caesar Salad', category: 'Ensaladas', available: true, price: 169 },
        { id: 'F061', name: 'Garden Crispy Chicken Salad', category: 'Ensaladas', available: true, price: 179 },
        { id: 'F062', name: 'Garden Grilled Chicken Salad', category: 'Ensaladas', available: true, price: 179 },
        { id: 'F063', name: 'Side Caesar Salad', category: 'Ensaladas', available: true, price: 79 },
        { id: 'F064', name: 'Side Garden Salad', category: 'Ensaladas', available: true, price: 79 },
        { id: 'F065', name: 'Santa Fe Chicken Salad', category: 'Ensaladas', available: true, price: 189 },
        { id: 'F066', name: 'Honey BBQ Chicken Salad', category: 'Ensaladas', available: true, price: 189 },

        // KIDS MENU
        { id: 'F070', name: 'Boneless Kids', category: 'Kids', available: true, price: 99 },
        { id: 'F071', name: 'Mac & Cheese Kids', category: 'Kids', available: true, price: 99 },
        { id: 'F072', name: 'Grilled Tenders Kids', category: 'Kids', available: true, price: 99 },

        // POSTRES
        { id: 'F080', name: 'Sweet Apple Crisp', category: 'Postres', available: true, price: 109 },
        { id: 'F081', name: 'Waffle', category: 'Postres', available: true, price: 89 },
        { id: 'F082', name: 'Cheesecake Fresa', category: 'Postres', available: true, price: 99 },
        { id: 'F083', name: 'Cheesecake Caramelo', category: 'Postres', available: true, price: 99 },
        { id: 'F084', name: 'Chocolate Fudge Cake', category: 'Postres', available: true, price: 119 },
        { id: 'F085', name: 'Ice Cream', category: 'Postres', available: true, price: 49 },

        // ALITAS (TRADICIONALES)
        { id: 'F130', name: 'Alitas Small', category: 'Alitas', available: true, price: 149 },
        { id: 'F131', name: 'Alitas Medium', category: 'Alitas', available: true, price: 229 },
        { id: 'F132', name: 'Alitas Large', category: 'Alitas', available: true, price: 299 },
        { id: 'F133', name: 'Wings Platter', category: 'Alitas', available: true, price: 549 },

        // BONELESS
        { id: 'F140', name: 'Boneless Small', category: 'Boneless', available: true, price: 139 },
        { id: 'F141', name: 'Boneless Medium', category: 'Boneless', available: true, price: 219 },
        { id: 'F142', name: 'Boneless Large', category: 'Boneless', available: true, price: 289 },
        { id: 'F143', name: 'Boneless Platter', category: 'Boneless', available: true, price: 519 },


        // SALSAS
        { id: 'F090', name: "Blazin' Knock Out", category: 'Salsas', available: true, price: 0 },
        { id: 'F091', name: 'Wild Buffalo', category: 'Salsas', available: true, price: 0 },
        { id: 'F092', name: 'Mango Habanero', category: 'Salsas', available: true, price: 0 },
        { id: 'F093', name: 'Hot Buffalo', category: 'Salsas', available: true, price: 0 },
        { id: 'F094', name: 'Hot BBQ', category: 'Salsas', available: true, price: 0 },
        { id: 'F095', name: 'Asian Zing', category: 'Salsas', available: true, price: 0 },
        { id: 'F096', name: 'Spicy Garlic', category: 'Salsas', available: true, price: 0 },
        { id: 'F097', name: 'Medium Buffalo', category: 'Salsas', available: true, price: 0 },
        { id: 'F098', name: 'Honey BBQ', category: 'Salsas', available: true, price: 0 },
        { id: 'F099', name: 'Lemon Pepper', category: 'Salsas', available: true, price: 0 },
        { id: 'F100', name: 'Parmesan Garlic', category: 'Salsas', available: true, price: 0 },
        { id: 'F101', name: 'Buffalo Mild', category: 'Salsas', available: true, price: 0 },
        { id: 'F102', name: 'Teriyaki', category: 'Salsas', available: true, price: 0 },
        { id: 'F103', name: 'Sweet BBQ', category: 'Salsas', available: true, price: 0 },

        // SAZONADORES
        { id: 'F110', name: 'Desert Heat', category: 'Sazonadores', available: true, price: 0 },
        { id: 'F111', name: 'Buffalo', category: 'Sazonadores', available: true, price: 0 },
        { id: 'F112', name: 'Chipotle BBQ', category: 'Sazonadores', available: true, price: 0 },
        { id: 'F113', name: 'Lemmon Pepper', category: 'Sazonadores', available: true, price: 0 },
        { id: 'F114', name: 'Salt & Vinegar', category: 'Sazonadores', available: true, price: 0 },

        // ADEREZOS
        { id: 'F120', name: 'Ranch', category: 'Aderezos', available: true, price: 0 },
        { id: 'F121', name: 'Blue Cheese', category: 'Aderezos', available: true, price: 0 }
    ],
    bebidas: [
        // RON
        { id: 'B001', name: 'Appleton State', category: 'Ron', available: true, price: 95 },
        { id: 'B002', name: 'Bacardi Blanco', category: 'Ron', available: true, price: 85 },
        { id: 'B003', name: 'Captain Morgan', category: 'Ron', available: true, price: 85 },
        { id: 'B004', name: 'Captain Morgan Blanco', category: 'Ron', available: true, price: 80 },
        { id: 'B005', name: 'Matusalem Clásico', category: 'Ron', available: true, price: 95 },
        { id: 'B006', name: 'Matusalem Platino', category: 'Ron', available: true, price: 90 },
        { id: 'B007', name: 'Zacapa 23', category: 'Ron', available: true, price: 210 },

        // TEQUILA
        { id: 'B010', name: '1800 Añejo', category: 'Tequila', available: true, price: 120 },
        { id: 'B011', name: 'Centenario Plata', category: 'Tequila', available: true, price: 95 },
        { id: 'B012', name: 'Centenario Reposado', category: 'Tequila', available: true, price: 105 },
        { id: 'B013', name: 'Don Julio 70', category: 'Tequila', available: true, price: 160 },
        { id: 'B014', name: 'Don Julio Blanco', category: 'Tequila', available: true, price: 125 },
        { id: 'B015', name: 'Don Julio Reposado', category: 'Tequila', available: true, price: 135 },
        { id: 'B016', name: 'Gran Majo', category: 'Tequila', available: true, price: 140 },
        { id: 'B017', name: 'Herradura Plata', category: 'Tequila', available: true, price: 115 },
        { id: 'B018', name: 'Jose Cuervo Tradicional', category: 'Tequila', available: true, price: 100 },
        { id: 'B019', name: 'Maestro Dobel Diamante', category: 'Tequila', available: true, price: 145 },
        { id: 'B020', name: 'Tradicional Cristalino', category: 'Tequila', available: true, price: 110 },

        // MEZCAL
        { id: 'B030', name: '400 Conejos', category: 'Mezcal', available: true, price: 130 },
        { id: 'B031', name: 'Ojo de Tigre', category: 'Mezcal', available: true, price: 125 },
        { id: 'B032', name: 'Gusano Rojo', category: 'Mezcal', available: true, price: 110 },

        // GINEBRA
        { id: 'B040', name: 'Beefeater', category: 'Ginebra', available: true, price: 115 },
        { id: 'B041', name: 'Bombay Sapphire', category: 'Ginebra', available: true, price: 125 },
        { id: 'B042', name: 'Tanqueray', category: 'Ginebra', available: true, price: 120 },
        { id: 'B043', name: "Hendrick's", category: 'Ginebra', available: true, price: 155 },

        // BRANDY
        { id: 'B050', name: 'Torres 10', category: 'Brandy', available: true, price: 105 },
        { id: 'B051', name: 'Terry Centenario', category: 'Brandy', available: true, price: 95 },

        // WHISKEY
        { id: 'B060', name: "Jack Daniel's", category: 'Whiskey', available: true, price: 110 },
        { id: 'B061', name: 'Captain Walker Black Label 12', category: 'Whiskey', available: true, price: 165 },
        { id: 'B062', name: 'Johnnie Walker Red Label', category: 'Whiskey', available: true, price: 120 },
        { id: 'B063', name: "Jameson's", category: 'Whiskey', available: true, price: 115 },
        { id: 'B064', name: 'Glenlivet', category: 'Whiskey', available: true, price: 175 },
        { id: 'B065', name: 'Macallan 12', category: 'Whiskey', available: true, price: 210 },

        // VODKA
        { id: 'B070', name: 'Absolut', category: 'Vodka', available: true, price: 95 },
        { id: 'B071', name: 'Grey Goose', category: 'Vodka', available: true, price: 155 },
        { id: 'B072', name: 'Smirnoff', category: 'Vodka', available: true, price: 85 },
        { id: 'B073', name: 'Smirnoff Tamarindo', category: 'Vodka', available: true, price: 90 },
        { id: 'B074', name: 'Stolichnaya', category: 'Vodka', available: true, price: 100 },

        // DIGESTIVOS
        { id: 'B080', name: 'Baileys', category: 'Digestivos', available: true, price: 95 },
        { id: 'B081', name: 'Jagermeister', category: 'Digestivos', available: true, price: 95 },
        { id: 'B082', name: 'Licor 43', category: 'Digestivos', available: true, price: 105 },

        // CERVEZA BARRIL
        { id: 'B100', name: 'Tecate Light (Barril)', category: 'Cerveza Barril', available: true, price: 65 },
        { id: 'B101', name: 'Indio (Barril)', category: 'Cerveza Barril', available: true, price: 65 },
        { id: 'B102', name: 'XX Ambar (Barril)', category: 'Cerveza Barril', available: true, price: 69 },
        { id: 'B103', name: 'XX Lager (Barril)', category: 'Cerveza Barril', available: true, price: 69 },
        { id: 'B104', name: 'Heineken (Barril)', category: 'Cerveza Barril', available: true, price: 75 },

        // CERVEZA BOTELLA
        { id: 'B110', name: 'Amstel Ultra', category: 'Cerveza Botella', available: true, price: 69 },
        { id: 'B111', name: 'Bohemia Clásica', category: 'Cerveza Botella', available: true, price: 72 },
        { id: 'B112', name: 'Bohemia Cristal', category: 'Cerveza Botella', available: true, price: 72 },
        { id: 'B113', name: 'Bohemia Oscura', category: 'Cerveza Botella', available: true, price: 72 },
        { id: 'B114', name: 'Bohemia Weizen', category: 'Cerveza Botella', available: true, price: 72 },
        { id: 'B115', name: 'Carta Blanca', category: 'Cerveza Botella', available: true, price: 60 },
        { id: 'B116', name: 'Heineken', category: 'Cerveza Botella', available: true, price: 75 },
        { id: 'B117', name: 'Indio', category: 'Cerveza Botella', available: true, price: 65 },
        { id: 'B118', name: 'Miller High Life', category: 'Cerveza Botella', available: true, price: 65 },
        { id: 'B119', name: 'Miller Lite', category: 'Cerveza Botella', available: true, price: 65 },
        { id: 'B120', name: 'Sol', category: 'Cerveza Botella', available: true, price: 62 },
        { id: 'B121', name: 'Tecate', category: 'Cerveza Botella', available: true, price: 62 },
        { id: 'B122', name: 'Tecate Light', category: 'Cerveza Botella', available: true, price: 62 },
        { id: 'B123', name: 'XX Ambar', category: 'Cerveza Botella', available: true, price: 65 },
        { id: 'B124', name: 'XX Lager', category: 'Cerveza Botella', available: true, price: 65 },
        { id: 'B125', name: 'XX Ultra', category: 'Cerveza Botella', available: true, price: 67 },

        // JARRA CERVEZA
        { id: 'B130', name: 'Tecate Light (Jarra)', category: 'Jarra Cerveza', available: true, price: 185 },
        { id: 'B131', name: 'Indio (Jarra)', category: 'Jarra Cerveza', available: true, price: 185 },
        { id: 'B132', name: 'XX Ambar (Jarra)', category: 'Jarra Cerveza', available: true, price: 195 },
        { id: 'B133', name: 'XX Lager (Jarra)', category: 'Jarra Cerveza', available: true, price: 195 },
        { id: 'B134', name: 'Heineken (Jarra)', category: 'Jarra Cerveza', available: true, price: 215 },

        // CAGUAMAS
        { id: 'B140', name: 'Tecate (Caguama)', category: 'Caguamas', available: true, price: 110 },
        { id: 'B141', name: 'Tecate Light (Caguama)', category: 'Caguamas', available: true, price: 110 },
        { id: 'B142', name: 'XX Ambar (Caguama)', category: 'Caguamas', available: true, price: 115 },
        { id: 'B143', name: 'XX Lager (Caguama)', category: 'Caguamas', available: true, price: 115 },
        { id: 'B144', name: 'Indio (Caguama)', category: 'Caguamas', available: true, price: 110 },
        { id: 'B145', name: 'Carta Blanca (Caguama)', category: 'Caguamas', available: true, price: 100 },

        // REFRESCOS
        { id: 'B150', name: 'Coca-Cola', category: 'Refrescos', available: true, price: 45 },
        { id: 'B151', name: 'Sprite', category: 'Refrescos', available: true, price: 45 },
        { id: 'B152', name: 'Fanta', category: 'Refrescos', available: true, price: 45 },
        { id: 'B153', name: 'Sidral Mundet', category: 'Refrescos', available: true, price: 45 },
        { id: 'B154', name: 'Fuzetea', category: 'Refrescos', available: true, price: 45 },
        // Nuevos
        { id: 'B155', name: 'Coca-Cola Light', category: 'Refrescos', available: true, price: 45 },
        { id: 'B156', name: 'Coca-Cola Zero', category: 'Refrescos', available: true, price: 45 },
        { id: 'B157', name: 'Agua Mineral Ciel', category: 'Refrescos', available: true, price: 40 },
        { id: 'B158', name: 'Topo Chico', category: 'Refrescos', available: true, price: 49 },
        { id: 'B159', name: 'Ginger Ale', category: 'Refrescos', available: true, price: 45 },
        { id: 'B160', name: 'Agua Quina', category: 'Refrescos', available: true, price: 45 },
        { id: 'B165', name: 'Fresca', category: 'Refrescos', available: true, price: 45 },
        { id: 'B166', name: 'Agua Natural Ciel', category: 'Refrescos', available: true, price: 35 },

        // LIMONADAS
        { id: 'B161', name: 'Limonada', category: 'Limonadas', available: true, price: 55 },
        { id: 'B162', name: 'Naranjada', category: 'Limonadas', available: true, price: 55 },
        { id: 'B170', name: 'Limonada Mango', category: 'Limonadas', available: true, price: 65 },
        { id: 'B171', name: 'Limonada Fresa', category: 'Limonadas', available: true, price: 65 },
        { id: 'B172', name: 'Limonada Menta', category: 'Limonadas', available: true, price: 65 },
        { id: 'B173', name: 'Limonada Frutos Rojos', category: 'Limonadas', available: true, price: 65 },

        // CAFÉ
        { id: 'B174', name: 'Café Expresso', category: 'Café', available: true, price: 45 },
        { id: 'B175', name: 'Café Capuccino', category: 'Café', available: true, price: 55 },
        { id: 'B176', name: 'Café Americano', category: 'Café', available: true, price: 45 },

        // OTROS
        { id: 'B160', name: 'Agua', category: 'Otros', available: true, price: 35 },
        { id: 'B161', name: 'Café', category: 'Otros', available: true, price: 45 },
        { id: 'B162', name: 'Refresco de Lata', category: 'Otros', available: true, price: 40 },
        { id: 'B163', name: 'Agua Mineral', category: 'Otros', available: true, price: 40 },



        // COCTELES
        { id: 'B200', name: 'Lime Mojito', category: 'Cocteles', available: true, price: 110 },
        { id: 'B201', name: 'Buffalo Zoo', category: 'Cocteles', available: true, price: 125 },
        { id: 'B202', name: 'B-Dubs Mule', category: 'Cocteles', available: true, price: 115 },
        { id: 'B203', name: 'Strawberry Daiquiri', category: 'Cocteles', available: true, price: 120 },
        { id: 'B204', name: 'Carajillo', category: 'Cocteles', available: true, price: 130 },
        { id: 'B205', name: 'Wild Bloody Mary', category: 'Cocteles', available: true, price: 115 },
        { id: 'B206', name: 'Piña Colada', category: 'Cocteles', available: true, price: 110 },
        { id: 'B207', name: 'Country Club Cooler', category: 'Cocteles', available: true, price: 105 },
        { id: 'B208', name: 'Limada de Tequila', category: 'Cocteles', available: true, price: 115 },

        // MARGARITAS
        { id: 'B220', name: 'Dos-a-Rita', category: 'Margaritas', available: true, price: 155 },
        { id: 'B221', name: 'Spicy Passion Fruit Margarita', category: 'Margaritas', available: true, price: 145 },
        { id: 'B222', name: 'Top Shelf Margarita', category: 'Margaritas', available: true, price: 165 },
        { id: 'B223', name: 'Twisted Margarita', category: 'Margaritas', available: true, price: 135 },
        { id: 'B224', name: 'House Margarita', category: 'Margaritas', available: true, price: 125 },

        // MEZCALITAS
        { id: 'B230', name: 'Mezcal Mule', category: 'Mezcalitas', available: true, price: 135 },
        { id: 'B231', name: 'Mezcal con Naranja', category: 'Mezcalitas', available: true, price: 140 },
        { id: 'B232', name: 'Mezcal con Jamaica', category: 'Mezcalitas', available: true, price: 140 },

        // EXTRAS BARRA
        { id: 'B300', name: 'Vaso Chelado', category: 'Extras Barra', available: true, price: 15 },
        { id: 'B301', name: 'Vaso Michelado', category: 'Extras Barra', available: true, price: 15 },
        { id: 'B302', name: 'Vaso Clamato (Regular)', category: 'Extras Barra', available: true, price: 25 },
        { id: 'B303', name: 'Vaso Clamato (Tall)', category: 'Extras Barra', available: true, price: 30 },
        { id: 'B304', name: 'Mezcla Clamato (Regular)', category: 'Extras Barra', available: true, price: 25 },
        { id: 'B305', name: 'Mezcla Clamato (Tall)', category: 'Extras Barra', available: true, price: 30 }
    ]
};


// --- MOCK DATA GENERATOR (2025) - ENHANCED ---
// --- MOCK DATA GENERATOR (DETERMINISTIC) ---
const GENERATE_DATA = () => {
    // FIXED NAMES FOR CONSISTENCY ACROSS DEVICES
    const fixedProfiles = [
        { id: 'C001', fn: 'Juan', ln: 'Perez', ln2: 'Gomez', city: 'Querétaro' },
        { id: 'C002', fn: 'Maria', ln: 'Lopez', ln2: 'Hernandez', city: 'Juriquilla' },
        { id: 'C003', fn: 'Pedro', ln: 'Ramirez', ln2: 'Diaz', city: 'El Refugio' },
        { id: 'C004', fn: 'Luis', ln: 'Martinez', ln2: 'Sanchez', city: 'Querétaro' },
        { id: 'C005', fn: 'Ana', ln: 'Garcia', ln2: 'Torres', city: 'Jurica' },
        { id: 'C006', fn: 'Sofia', ln: 'Rodriguez', ln2: 'Flores', city: 'Querétaro' },
        { id: 'C007', fn: 'Carlos', ln: 'Gonzalez', ln2: 'Rivera', city: 'Juriquilla' },
        { id: 'C008', fn: 'Miguel', ln: 'Hernandez', ln2: 'Reyes', city: 'El Refugio' },
        { id: 'C009', fn: 'Lucia', ln: 'Diaz', ln2: 'Morales', city: 'Querétaro' },
        { id: 'C010', fn: 'Elena', ln: 'Vargas', ln2: 'Jimenez', city: 'Jurica' },
        { id: 'C011', fn: 'Diego', ln: 'Castillo', ln2: 'Mendoza', city: 'Querétaro' },
        { id: 'C012', fn: 'Valentina', ln: 'Mendoza', ln2: 'Vargas', city: 'Juriquilla' },
        { id: 'C013', fn: 'Camila', ln: 'Reyes', ln2: 'Castillo', city: 'El Refugio' },
        { id: 'C014', fn: 'Mateo', ln: 'Morales', ln2: 'Jimenez', city: 'Querétaro' },
        { id: 'C015', fn: 'Lucas', ln: 'Jimenez', ln2: 'Morales', city: 'Jurica' },
        { id: 'C016', fn: 'Nicolas', ln: 'Flores', ln2: 'Reyes', city: 'Querétaro' },
        { id: 'C017', fn: 'Samuel', ln: 'Torres', ln2: 'Diaz', city: 'Juriquilla' },
        { id: 'C018', fn: 'Alejandro', ln: 'Ramirez', ln2: 'Lopez', city: 'El Refugio' },
        { id: 'C019', fn: 'Daniel', ln: 'Sanchez', ln2: 'Perez', city: 'Querétaro' },
        { id: 'C020', fn: 'Fernanda', ln: 'Gomez', ln2: 'Garcia', city: 'Jurica' }
    ];

    const customers = fixedProfiles.map((p, i) => {
        let bdayMonth = (i % 12) + 1;
        let bdayDay = (i % 28) + 1;

        return {
            id: p.id,
            firstName: p.fn,
            lastName: p.ln,
            lastName2: p.ln2,
            birthday: `1990-${bdayMonth.toString().padStart(2, '0')}-${bdayDay.toString().padStart(2, '0')}`,
            email: `${p.fn.toLowerCase()}.${p.ln.toLowerCase()}${i + 1}@gmail.com`,
            phone: '442' + (1000000 + i).toString(),
            city: p.city,
            country: 'México',
            colony: p.city === 'Querétaro' ? 'Centro' : p.city,
            visits: 0,
            teams: ['Dallas Cowboys', 'Real Madrid'],
            team: 'Dallas Cowboys',
            topFood: ['Boneless BBQ', 'Hamburguesa Clásica'],
            topDrinks: ['Cerveza Ultra', 'Limonada Mineral'],
            notes: 'Cliente base generado.',
            couchCard: i % 5 === 0
        };
    });

    // NO HISTORICAL VISITS FOR NOW TO AVOID CONFUSION, OR MINIMAL STATIC ONES
    const visits = [];
    const orders = [];

    // --- MOCK 1 YEAR HISTORY FOR C001 (Juan Perez) ---
    const favItems = [
        { id: 'F141', price: 219 }, // Boneless Medium
        { id: 'F030', price: 189 }, // Stadium Burger
        { id: 'B116', price: 75 },  // Heineken Botella
        { id: 'F092', price: 0 }    // Mango Habanero (Salsa)
    ];

    let currentMockDate = new Date();
    currentMockDate.setFullYear(currentMockDate.getFullYear() - 1); // Start 1 year ago

    for (let i = 0; i < 20; i++) {
        // Random days jump 5-20 days
        currentMockDate.setDate(currentMockDate.getDate() + Math.floor(Math.random() * 15) + 5);
        if (currentMockDate >= new Date()) break;

        const visitId = `v_mock_${i}`;
        const pax = Math.floor(Math.random() * 4) + 2;

        // Random hour between 18 and 23
        currentMockDate.setHours(18 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 59), 0, 0);

        visits.push({
            id: visitId,
            customerId: 'C001',
            branchId: 'juriquilla',
            table: Math.floor(Math.random() * 20) + 110, // 110-130
            pax: pax,
            status: 'closed',
            waiterId: 'wj1',
            date: currentMockDate.toISOString().split('T')[0],
            startTime: currentMockDate.toISOString(),
            reason: i % 3 === 0 ? 'Partido' : 'Casual',
            totalAmount: favItems.reduce((acc, item) => acc + item.price, 0) + 75 // Adding 1 extra drink
        });

        orders.push({
            id: `o_mock_${i}`,
            visitId: visitId,
            items: [
                { itemId: 'F141', name: 'Boneless Medium', quantity: 1, price: 219 },
                { itemId: 'F030', name: 'Stadium Burger', quantity: 1, price: 189 },
                { itemId: 'B116', name: 'Heineken', quantity: 3, price: 75 },
                { itemId: 'F092', name: 'Mango Habanero', quantity: 1, price: 0 }
            ],
            timestamp: currentMockDate.toISOString(),
            status: 'delivered'
        });
    }

    // console.log('✅ Generated 20 STATIC customers for consistent testing.');
    return { customers, visits, orders };
};

const MOCK = GENERATE_DATA();

// Initial Data Structure
const INITIAL_DATA = {
    branches: [
        {
            id: 'juriquilla',
            name: 'Juriquilla',
            tables: {
                regular: [111, 112, 113, 114, 121, 122, 123, 131, 132, 133, 134, 135, 141, 142, 143, 144, 151, 152, 153, 211, 212, 213, 214, 215, 216, 221, 222, 223, 224, 241, 242, 243, 244, 245, 251, 252, 253, 254, 411, 412, 413, 414, 415, 416, 417, 421, 422, 423, 424, 425, 426],
                barra: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320]
            }
        },
        {
            id: 'paseo',
            name: 'Paseo Querétaro',
            tables: {
                regular: Array.from({ length: 30 }, (_, i) => i + 1), // 1-30
                barra: []
            }
        },
        {
            id: 'alamos',
            name: 'Álamos',
            tables: {
                regular: Array.from({ length: 40 }, (_, i) => i + 1), // 1-40
                barra: []
            }
        }
    ],

    // MENU SYSTEM - Food and Beverage Items
    // MENU SYSTEM - Food and Beverage Items
    menu: MENU_DATA,

    // ORDERS - Sistema de órdenes
    orders: MOCK.orders || [],

    users: [
        // Super Admin
        { id: 'a1', username: 'raul', password: '123', role: 'admin', name: 'Raul' },

        // Regional
        { id: 'r1', username: 'adan', password: '123', role: 'regional', name: 'Adan' },

        // JURIQUILLA - Gerentes (4)
        { id: 'gj1', username: 'beto', password: '0252', role: 'manager', name: 'Beto', branchId: 'juriquilla' },
        { id: 'gj2', username: 'nando', password: '123', role: 'manager', name: 'Nando', branchId: 'juriquilla' },
        { id: 'gj3', username: 'roberto', password: '123', role: 'manager', name: 'Roberto', branchId: 'juriquilla' },
        { id: 'gj4', username: 'omar', password: '123', role: 'manager', name: 'Omar', branchId: 'juriquilla' },

        // ALAMOS - Gerentes (4)
        { id: 'ga1', username: 'armando', password: '123', role: 'manager', name: 'Armando', branchId: 'alamos' },
        { id: 'ga2', username: 'karen', password: '123', role: 'manager', name: 'Karen', branchId: 'alamos' },
        { id: 'ga3', username: 'betty', password: '123', role: 'manager', name: 'Betty', branchId: 'alamos' },
        { id: 'ga4', username: 'diego', password: '123', role: 'manager', name: 'Diego', branchId: 'alamos' },

        // PASEO - Gerentes (2)
        { id: 'gp1', username: 'isabel', password: '123', role: 'manager', name: 'Isabel', branchId: 'paseo' },
        { id: 'gp2', username: 'edgar', password: '123', role: 'manager', name: 'Edgar', branchId: 'paseo' },

        // HOSTESS (3)
        { id: 'hj1', username: 'hossjur', password: '123', role: 'hostess', name: 'Hostess Juriquilla', branchId: 'juriquilla' },
        { id: 'hj2', username: 'hossden', password: '2308', role: 'hostess', name: 'Hostess Denisse', branchId: 'juriquilla' },
        { id: 'ha1', username: 'hossalamos', password: '123', role: 'hostess', name: 'Hostess Álamos', branchId: 'alamos' },
        { id: 'hp1', username: 'hosspaseo', password: '123', role: 'hostess', name: 'Hostess Paseo', branchId: 'paseo' },

        // JURIQUILLA - Meseros (13): 8 servers, 3 barra, 2 caja
        { id: 'wj1', username: '1060', password: '1977', role: 'waiter', name: 'Alejandro Ortiz Martínez', position: 'SERVER', branchId: 'juriquilla' },
        { id: 'wj2', username: '1604', password: 'oneway91', role: 'waiter', name: 'Mario Esperanza González', position: 'SERVER', branchId: 'juriquilla' },
        { id: 'wj3', username: '1033', password: '63313', role: 'waiter', name: 'Santiago Pacheco Ferreiro', position: 'SERVER', branchId: 'juriquilla' },
        { id: 'wj4', username: 'jessica.ortiz', password: '123', role: 'waiter', name: 'Jessica Ortiz Hernández', position: 'SERVER', branchId: 'juriquilla' },
        { id: 'wj5', username: '10586', password: '4578', role: 'waiter', name: 'Anahí Briones Rodriguez', position: 'SERVER', branchId: 'juriquilla' },
        { id: 'wj6', username: '10570', password: '1302', role: 'waiter', name: 'Jekob Guerrero Barron', position: 'SERVER', branchId: 'juriquilla' },
        { id: 'wj7', username: '10421', password: '1170', role: 'waiter', name: 'Isaac Bravo Olvera', position: 'SERVER', branchId: 'juriquilla' },
        { id: 'wj8', username: 'angel.vega', password: '123', role: 'waiter', name: 'Angel Vega Bautista', position: 'SERVER', branchId: 'juriquilla' },
        { id: 'wj9_barra', username: 'barra', password: '031', role: 'waiter', name: 'Barra Juriquilla', position: 'BARRA', branchId: 'juriquilla' },
        { id: 'wj11', username: 'mario.lobera', password: '123', role: 'waiter', name: 'Mario Lobera Huerta', position: 'BARRA', branchId: 'juriquilla' },
        { id: 'wj12', username: 'jaime.vazquez', password: '123', role: 'waiter', name: 'Jaime Vazquez Maldonado', position: 'CAJA', branchId: 'juriquilla' },
        { id: 'wj13', username: 'brenda.cruz', password: '123', role: 'waiter', name: 'Brenda Cruz Rocio', position: 'CAJA', branchId: 'juriquilla' },
        { id: 'wj14', username: '10780', password: '12345', role: 'waiter', name: 'Samantha Mesera', position: 'SERVER', branchId: 'juriquilla' },

        // ALAMOS - Meseros (11): 9 servers, 2 barra
        { id: 'wa1', username: 'veronica.camacho', password: '123', role: 'waiter', name: 'Verónica Camacho de Santiago', position: 'SERVER', branchId: 'alamos' },
        { id: 'wa2', username: 'emiliano.contreras', password: '123', role: 'waiter', name: 'Emiliano Contreras Cruz', position: 'SERVER', branchId: 'alamos' },
        { id: 'wa3', username: 'ivalu.maciel', password: '123', role: 'waiter', name: 'Ivalu Maciel Chavez', position: 'SERVER', branchId: 'alamos' },
        { id: 'wa4', username: 'jose.ardon', password: '123', role: 'waiter', name: 'José Elías Ardón Vargas', position: 'SERVER', branchId: 'alamos' },
        { id: 'wa5', username: 'montserrat.olvera', password: '123', role: 'waiter', name: 'María Montserrat Olvera Suasti', position: 'SERVER', branchId: 'alamos' },
        { id: 'wa6', username: 'fabiola.cordova', password: '123', role: 'waiter', name: 'Fabiola Córdova Bolaños', position: 'SERVER', branchId: 'alamos' },
        { id: 'wa7', username: 'aithor.cosme', password: '123', role: 'waiter', name: 'Aithor Eliot Cosme Perez', position: 'SERVER', branchId: 'alamos' },
        { id: 'wa8', username: 'metzli.gonzalez', password: '123', role: 'waiter', name: 'Metzli Yamil González Morales', position: 'SERVER', branchId: 'alamos' },
        { id: 'wa9', username: 'igor.gonzalez', password: '123', role: 'waiter', name: 'Igor Atahualpa González Ortiz', position: 'SERVER', branchId: 'alamos' },
        { id: 'wa10', username: 'valeria.rocha', password: '123', role: 'waiter', name: 'Valeria Rocha Camacho', position: 'BARRA', branchId: 'alamos' },
        { id: 'wa11', username: 'juan.pinal', password: '123', role: 'waiter', name: 'Juan Iván Pinal de la Hera', position: 'BARRA', branchId: 'alamos' },

        // PASEO - Meseros (5): 4 servers, 1 barra
        { id: 'wp1', username: 'martin.fuente', password: '123', role: 'waiter', name: 'Martín Fuente Garcia', position: 'SERVER', branchId: 'paseo' },
        { id: 'wp2', username: 'rosario.meza', password: '123', role: 'waiter', name: 'Rosario Meza Meza', position: 'SERVER', branchId: 'paseo' },
        { id: 'wp3', username: 'jesus.xalamihua', password: '123', role: 'waiter', name: 'Jesús Xalamihua Altamirano', position: 'SERVER', branchId: 'paseo' },
        { id: 'wp4', username: 'gabriel.clemente', password: '123', role: 'waiter', name: 'Gabriel Clemente Adan', position: 'SERVER', branchId: 'paseo' },
        { id: 'wp5', username: 'jonathan.torres', password: '123', role: 'waiter', name: 'Jonathan Javier Torres Adan', position: 'BARRA', branchId: 'paseo' }
    ],
    customers: MOCK.customers,
    visits: MOCK.visits,
    prospects: [],
    waitlist: [],
    reservations: [],
    campaigns: [],

    // AUTO-INGESTION CONFIGURATION (ESPN SLUGS)
    ingestionConfig: {
        leagues: [
            // SOCCER
            { id: 'mex.1', name: 'Liga MX', type: 'soccer', active: true },
            { id: 'eng.1', name: 'Premier League', type: 'soccer', active: true },
            { id: 'esp.1', name: 'La Liga', type: 'soccer', active: true },
            { id: 'ita.1', name: 'Serie A', type: 'soccer', active: true },
            { id: 'uefa.champions', name: 'Champions Cloud', type: 'soccer', active: true },

            // US SPORTS
            { id: 'nfl', name: 'NFL', type: 'football', active: true },
            { id: 'nba', name: 'NBA', type: 'basketball', active: true },
            { id: 'mlb', name: 'MLB', type: 'baseball', active: true },

            // FIGHTING & RACING
            { id: 'f1', name: 'F1', type: 'racing', active: true },
            { id: 'ufc', name: 'UFC', type: 'mma', active: true },
            { id: 'boxing', name: 'Boxeo', type: 'boxing', active: true }
        ],
        teams: []
    },
    // MENU CATALOG - Para autocompletado en captura de consumo
    menuCatalog: {
        entries: [
            'Aros de Cebolla', 'Nachos con Queso', 'Papas Fritas', 'Alitas Buffalo (6)', 'Alitas Buffalo (12)',
            'Dedos de Queso', 'Boneless Buffalo (6)', 'Boneless BBQ (6)', 'Chips con Guacamole',
            'Quesadilla Sencilla', 'Quesadilla con Carne', 'Jalapeño Poppers', 'Dip de Espinacas'
        ],
        mainDishes: [
            'Boneless BBQ', 'Boneless Buffalo', 'Boneless Honey BBQ', 'Boneless Teriyaki',
            'Alitas Tradicionales (12)', 'Alitas Tradicionales (18)', 'Alitas Tradicionales (24)',
            'Hamburguesa Clásica', 'Hamburguesa Bacon', 'Hamburguesa BBQ', 'Hamburguesa Doble',
            'Wrap de Pollo', 'Wrap Buffalo', 'Ensalada Caesar', 'Ensalada de Pollo',
            'Costillas BBQ', 'Costillas Full Rack', 'Tacos de Pescado', 'Quesadilla Grande',
            'Nachos Supremos', 'Fajitas de Res', 'Fajitas de Pollo'
        ],
        drinks: [
            'Cerveza Corona', 'Cerveza Modelo', 'Cerveza Victoria', 'Cerveza Indio', 'Cerveza Pacífico',
            'Cerveza Heineken', 'Cerveza Stella', 'Cerveza Bud Light', 'Cerveza Michelada',
            'Margarita Natural', 'Margarita de Mango', 'Margarita de Jamaica', 'Margarita de Tamarindo',
            'Mojito', 'Piña Colada', 'Cuba Libre', 'Paloma', 'Sangría',
            'Coca Cola', 'Sprite', 'Fanta', 'Agua Mineral', 'Limonada', 'Té Helado',
            'Café Americano', 'Cappuccino'
        ],
        desserts: [
            'Volcán de Chocolate', 'Brownie con Helado', 'Cheesecake', 'Helado 3 Bolas',
            'Flan Napolitano', 'Churros con Chocolate'
        ]
    },
    // NEW: Daily Information System - Enhanced
    dailyInfo: {
        // Partidos de HOY
        games: [
            { id: 'g1', league: 'NFL', homeTeam: 'Dallas Cowboys', awayTeam: 'Philadelphia Eagles', time: '19:30', date: new Date().toISOString().split('T')[0] },
            { id: 'g2', league: 'NBA', homeTeam: 'Lakers', awayTeam: 'Warriors', time: '21:00', date: new Date().toISOString().split('T')[0] },
            { id: 'g3', league: 'Liga MX', homeTeam: 'América', awayTeam: 'Chivas', time: '20:00', date: new Date().toISOString().split('T')[0] },
            { id: 'g4', league: 'NFL', homeTeam: 'Chiefs', awayTeam: 'Raiders', time: '16:00', date: new Date().toISOString().split('T')[0] }
        ],
        // Catálogo permanente de promociones
        promoCatalog: [
            { id: 'pc1', title: '2x1 en Cervezas Nacionales', description: 'Toda la noche', createdAt: new Date().toISOString() },
            { id: 'pc2', title: 'Wings a $99', description: 'Orden de 10 piezas', createdAt: new Date().toISOString() },
            { id: 'pc3', title: 'Margarita Happy Hour', description: '2x1 de 4pm a 7pm', createdAt: new Date().toISOString() }
        ],
        // Promociones activas HOY (ids del catálogo)
        activePromoIds: ['pc1', 'pc2'],
        // Catálogo permanente de dinámicas
        dynamicCatalog: [
            { id: 'dc1', title: 'Concurso de Postres', description: 'El mesero que venda más postres hoy gana $500', metric: 'postres', createdAt: new Date().toISOString() },
            { id: 'dc2', title: 'Venta de Bebidas Premium', description: 'Más ventas de bebidas premium = premio', metric: 'bebidas_premium', createdAt: new Date().toISOString() }
        ],
        // Dinámica activa HOY
        activeDynamic: {
            catalogId: 'dc1',
            date: new Date().toISOString().split('T')[0],
            // Puntajes manuales por mesero (gerente los actualiza)
            scores: [
                { odoo_id: 'm1', waiterName: 'Carlos Mesero', score: 12 }
            ]
        },
        // Productos: 86 (agotados), 85 (por agotarse), push (impulsar)
        products: {
            // 86 = Agotados
            outOfStock86: [
                { id: 'p86_1', name: 'Costillas BBQ', category: 'cocina' },
                { id: 'p86_2', name: 'Cerveza Corona', category: 'meseros' }
            ],
            // 85 = Por agotarse (quedan pocos)
            lowStock85: [
                { id: 'p85_1', name: 'Nachos Supremos', category: 'cocina' }
            ],
            // Push = Productos a impulsar su venta
            push: [
                { id: 'push1', name: 'Postre Volcán de Chocolate', category: 'cocina' },
                { id: 'push2', name: 'Margarita de Jamaica', category: 'meseros' }
            ]
        }
    }
};

class Store {
    constructor() {
        this.data = this._load();
        this._syncUsers();
        this._syncMenuCatalog();
        this._syncMenu();

        // === FIREBASE SYNC ===
        const startSync = async () => {
            // Wait for dbFirestore to be actually available
            if (!window.dbFirestore || !window.FB) {
                console.log('⏳ Firebase not ready yet, waiting...');
                return;
            }

            if (this.syncStarted) return;

            console.log('🚀 Starting Firebase Realtime Sync...');
            this.syncStarted = true;

            try {
                // Ensure FB functions are available
                const { doc, getDoc, collection, onSnapshot } = window.FB;
                if (!doc || !getDoc || !collection || !onSnapshot) {
                    console.error("❌ Firebase helpers (FB) incomplete", window.FB);
                    return;
                }

                // 1. FORCE INITIAL FETCH - DAILY CONFIG
                const dailyRef = doc(window.dbFirestore, "config", "daily");
                const snapshot = await getDoc(dailyRef);
                if (snapshot.exists()) {
                    console.log("📥 INITIAL FETCH: Daily config loaded.");
                    const remoteData = snapshot.data();
                    const info = this.getDailyInfo();
                    info.games = remoteData.games || [];
                    info.gameRequests = remoteData.gameRequests || [];
                    this._save();
                }

                // 1.5 FORCE INITIAL FETCH - LIVE MENU (86 STATUS)
                const menuRef = doc(window.dbFirestore, "config", "menu");
                const menuSnapshot = await getDoc(menuRef);
                if (menuSnapshot.exists()) {
                    console.log("📥 INITIAL FETCH: Live Menu config loaded.");
                    this.data.menu = menuSnapshot.data();
                    this._save();
                }

                // 2. Start Listeners
                this.initRealtimeSync();

            } catch (e) {
                console.error("⚠️ Firebase Sync Error:", e);
            }
        };

        // Try immediately
        // Try immediately
        if (window.dbFirestore) {
            console.log('🔥 Firebase already ready. Starting sync...');
            startSync();
            this._syncLocalReservationsToFirebase(); // PUSH LOCAL DATA TO CLOUD
        } else {
            console.log('⏳ Waiting for Firebase to be ready...');
        }

        // Also listen for the custom event from index.html
        window.addEventListener('firebase-ready', () => {
            console.log('✅ Firebase Ready Event received. Starting sync...');
            startSync();
            this._syncLocalReservationsToFirebase();
        });

        // Backup: Try again in 1s and 3s just in case
        setTimeout(startSync, 1000);
        setTimeout(() => {
            console.log('⏰ Backup Sync Trigger (3s)');
            startSync();
            this._syncLocalReservationsToFirebase();
        }, 3000);

        this.listeners = [];

        // Iniciar Sync Local (Eventos entre pestañas)
        this._initLocalSync();
    }

    addListener(callback) {
        this.listeners.push(callback);
        // Returns unsubscribe function
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    notifyListeners() {
        this.listeners.forEach(cb => {
            try {
                cb();
            } catch (e) {
                console.error("Listener error:", e);
            }
        });
    }

    // --- CROSS-TAB SYNC (Exclusivo para Prototipo Local) ---
    _initLocalSync() {
        window.addEventListener('storage', (e) => {
            if (e.key === STORE_KEY) {
                console.log('🔄 Cambio detectado en otra pestaña. Sincronizando...');
                this.data = JSON.parse(e.newValue); // Recargar datos frescos
                this._triggerUIRefresh(); // Actualizar interfaz
            }
        });
    }

    _triggerUIRefresh() {
        // PROTECTION: Don't refresh if user is typing!
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        const isTyping = (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT');

        if (isTyping) {
            console.log('⚠️ Skipping Auto-Refresh because user is typing/selecting');
            return;
        }

        // Force UI Refresh based on current view
        if (typeof window.renderHostessDashboard === 'function' && document.getElementById('content-tables')) {
            console.log('🔄 Refreshing Hostess UI (Auto)');
            window.renderHostessDashboard();
        }
        if (typeof window.renderManagerDashboard === 'function' && document.getElementById('manager-content')) {
            console.log('🔄 Refreshing Manager UI (Auto)');
            const currentTab = window.CURRENT_MANAGER_TAB || 'tables';
            window.renderManagerDashboard(currentTab);
        }
        if (typeof window.renderWaiterDashboard === 'function' && document.getElementById('waitercontent-mesas')) {
            console.log('🔄 Refreshing Waiter UI (Auto)');
            window.renderWaiterDashboard();
        }

        // Notificar listeners genéricos si los hay
        this.notifyListeners();
    }

    // --- DATA VERSION ---
    // Increment this to force a reset of localStorage on all devices
    static DATA_VERSION = 6;

    _load() {
        const stored = localStorage.getItem(STORE_KEY);
        if (stored) {
            try {
                const parsedData = JSON.parse(stored);
                // Check version
                if (!parsedData.version || parsedData.version < Store.DATA_VERSION) {
                    console.log('⚠️ Data version mismatch or outdated. FORCING RESET to new deterministic data.');
                    localStorage.removeItem(STORE_KEY);
                    return this._initData();
                }
                return parsedData;
            } catch (e) {
                console.error("Data Load Error, resetting", e);
                return this._initData();
            }
        }
        return this._initData();
    }

    _initData() {
        // Clone INITIAL_DATA to ensure we have fresh objects
        const data = JSON.parse(JSON.stringify(INITIAL_DATA));
        data.version = Store.DATA_VERSION; // Set current version
        // Ensure customers are from MOCK if empty (legacy support)
        if (!data.customers || data.customers.length === 0) {
            data.customers = MOCK.customers;
            data.visits = MOCK.visits;
            data.orders = MOCK.orders || [];
        }
        return data;
    }
    initRealtimeSync() {
        if (!window.FB || !window.dbFirestore) return;

        const { onSnapshot, collection, query, where, doc } = window.FB;
        const db = window.dbFirestore;

        // 1. SYNC VISITS (Active Tables)
        // Only sync active visits to reduce bandwidth
        // But for simplicity in this demo, let's sync ALL visits created today or active
        const visitsRef = collection(db, "visits");

        onSnapshot(visitsRef, (snapshot) => {
            let changes = false;
            snapshot.docChanges().forEach((change) => {
                const visitData = change.doc.data();
                const localIdx = this.data.visits.findIndex(v => v.id === visitData.id);

                if (change.type === "added") {
                    // console.log(`🔥 SYNC ADD: Visit ${visitData.id} | Table ${visitData.table} | Branch ${visitData.branchId} | Status ${visitData.status}`);
                    if (localIdx === -1) {
                        this.data.visits.push(visitData);
                        changes = true;
                    }
                }
                if (change.type === "modified") {
                    // console.log(`🔥 SYNC MOD: Visit ${visitData.id} | Status ${visitData.status}`);
                    if (localIdx !== -1) {
                        // CRITICAL: Don't overwrite if local is closed but remote is active
                        const localVisit = this.data.visits[localIdx];

                        if (localVisit.status === 'closed' && visitData.status === 'active') {
                            console.log('⚠️ Skipping cloud update - local visit is closed:', visitData.id);
                            return; // Don't overwrite local closed status
                        }

                        this.data.visits[localIdx] = visitData; // Update local
                        changes = true;
                    }
                }
                if (change.type === "removed") {
                    if (localIdx !== -1) {
                        this.data.visits.splice(localIdx, 1);
                        changes = true;
                    }
                }
            });

            if (changes) {
                console.log("☁️ Actualización recibida de Firebase: Visitas. Total Local:", this.data.visits.length);
                this._save(); // Save to local storage

                // Use setTimeout to allow logic to settle before rendering logic checks the DOM
                setTimeout(() => {
                    // PROTECTION: Don't refresh if user is typing!
                    const activeTag = document.activeElement ? document.activeElement.tagName : '';
                    const isTyping = (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT');

                    if (isTyping) {
                        console.log('⚠️ Skipping Auto-Refresh because user is typing/selecting');
                        return;
                    }

                    // Force UI Refresh if on dashboard
                    if (typeof window.renderHostessDashboard === 'function' && document.getElementById('content-tables')) {
                        console.log('🔄 Refreshing Hostess UI (Auto)');
                        window.renderHostessDashboard();
                    }
                    if (typeof window.renderManagerDashboard === 'function' && document.getElementById('manager-content')) {
                        console.log('🔄 Refreshing Manager UI (Auto)');
                        // Refresh current tab if known, otherwise default to 'tables'
                        const currentTab = window.CURRENT_MANAGER_TAB || 'tables';
                        window.renderManagerDashboard(currentTab);
                    }
                    if (typeof window.renderWaiterDashboard === 'function' && document.getElementById('waitercontent-mesas')) {
                        console.log('🔄 Refreshing Waiter UI (Auto)');
                        window.renderWaiterDashboard();
                    }
                }, 100);
            }
        });

        // 2. SYNC GAME REQUESTS (Global Daily Info)
        // CRITICAL FIX: Use 'allGames' collection to support all dates
        // 'daily' was incorrectly forcing all game dates to TODAY
        const dailyRef = doc(db, "config", "allGames");
        onSnapshot(dailyRef, (docSnap) => {
            // console.log("☁️ FIREBASE SNAPSHOT: config/allGames", docSnap.exists() ? "EXISTS" : "DOES NOT EXIST", docSnap.metadata.fromCache ? "(CACHE)" : "(SERVER)");

            if (docSnap.exists()) {
                const remoteDaily = docSnap.data();
                // console.log("📦 REMOTE DATA:", JSON.stringify(remoteDaily));

                // 2A. REQUESTS (keep using dailyInfo for requests)
                const localReqs = JSON.stringify(this.getDailyInfo().gameRequests || []);
                const remoteReqs = JSON.stringify(remoteDaily.gameRequests || []);

                if (localReqs !== remoteReqs) {
                    console.log("☁️ UPDATE: Game Requests");
                    const info = this.getDailyInfo();
                    info.gameRequests = remoteDaily.gameRequests || [];
                    this._save();
                    // UI Refresh...
                    if (typeof window.renderManagerDashboard === 'function' && document.getElementById('managertab-games')) {
                        if (window.CURRENT_MANAGER_TAB === 'games') document.querySelector('#managertab-games').click();
                    }
                }

                // DISPATCH GLOBAL UPDATE EVENT
                if (localReqs !== remoteReqs) {
                    window.dispatchEvent(new CustomEvent('db-daily-update', { detail: { type: 'requests' } }));
                }

                // 2B. GAMES
                const localGames = JSON.stringify(this.getDailyInfo().games || []);
                const remoteGames = JSON.stringify(remoteDaily.games || []);

                // console.log(`🎮 Comparing Games:\nLocal: ${this.getDailyInfo().games?.length} items\nRemote: ${remoteDaily.games?.length} items`);

                if (localGames !== remoteGames) {
                    console.log("☁️ UPDATE: Games detected! Overwriting local data.");
                    const info = this.getDailyInfo();
                    info.games = remoteDaily.games || [];
                    this._save();

                    // Refresh UIs
                    // Manager:
                    if (typeof window.renderManagerDashboard === 'function' && document.getElementById('managertab-games')) {
                        console.log('🔄 Reloading Manager Game Tab');
                        if (window.CURRENT_MANAGER_TAB === 'games') document.querySelector('#managertab-games').click();
                    }
                    // Hostess
                    if (typeof window.renderHostessDashboard === 'function' && document.getElementById('content-tables')) {
                        console.log('🔄 Refreshing Hostess UI for Games Update (Games Changed)');
                        window.renderHostessDashboard();
                    }
                } else {
                    // console.log("🎮 Games are identical. No update needed.");
                }

                // DISPATCH GLOBAL UPDATE EVENT
                window.dispatchEvent(new CustomEvent('db-daily-update', { detail: { type: 'games' } }));
            } else {
                console.warn("⚠️ config/allGames document does not exist in Firestore! Manager needs to create it.");
            }
        }, (error) => {
            console.error("🔥 Error listening to config/allGames:", error);
        });

        // 3. SYNC CUSTOMERS
        const custRef = collection(db, "customers");
        onSnapshot(custRef, (snapshot) => {
            let changed = false;
            snapshot.docChanges().forEach((change) => {
                const custData = change.doc.data();
                const idx = this.data.customers.findIndex(c => c.id === custData.id);
                if (change.type === 'added' || change.type === 'modified') {
                    if (idx === -1) {
                        this.data.customers.push(custData);
                        changed = true;
                    } else {
                        this.data.customers[idx] = { ...this.data.customers[idx], ...custData };
                        changed = true;
                    }
                }
            });
            if (changed) {
                // console.log("☁️ Clientes sincronizados");
                this._save();
            }
        });

        // 4. SYNC WAITLIST
        const waitlistRef = collection(db, "waitlist");
        onSnapshot(waitlistRef, (snapshot) => {
            let changes = false;
            if (!this.data.waitlist) this.data.waitlist = [];

            snapshot.docChanges().forEach((change) => {
                const entry = change.doc.data();
                const idx = this.data.waitlist.findIndex(w => w.id === entry.id);

                if (change.type === "added") {
                    if (idx === -1) {
                        this.data.waitlist.push(entry);
                        changes = true;
                    }
                }
                if (change.type === "modified") {
                    if (idx !== -1) {
                        this.data.waitlist[idx] = entry;
                        changes = true;
                    }
                }
                if (change.type === "removed") {
                    if (idx !== -1) {
                        this.data.waitlist.splice(idx, 1);
                        changes = true;
                    }
                }
            });

            if (changes) {
                console.log("☁️ Lista de Espera sincronizada");
                this._save();
                if (typeof renderHostessDashboard === 'function' && document.getElementById('content-waitlist')) {
                    // Refresh if we are viewing waitlist
                    if (document.getElementById('content-waitlist').classList.contains('active')) {
                        if (typeof window.switchHostessTab === 'function') window.switchHostessTab('waitlist');
                    }
                    // Force refresh dashboard to update badges
                    if (typeof renderHostessDashboard === 'function') renderHostessDashboard();
                }
            }
        });


        // 5. SYNC RESERVATIONS (Listen to 'reservations' collection)
        const { collection: fbCollection, onSnapshot: fbOnSnapshot } = window.FB;
        fbOnSnapshot(fbCollection(window.dbFirestore, 'reservations'), (snapshot) => {
            let changes = false;

            // Get daily info to store reservations correctly
            const dailyInfo = this.getDailyInfo();
            if (!dailyInfo.reservations) dailyInfo.reservations = [];

            snapshot.docChanges().forEach((change) => {
                const resData = { id: change.doc.id, ...change.doc.data() };
                const idx = dailyInfo.reservations.findIndex(r => r.id === resData.id);

                if (change.type === "added") {
                    if (idx === -1) {
                        dailyInfo.reservations.push(resData);
                        changes = true;
                        console.log('📥 New reservation from cloud:', resData.customerName);
                    }
                }
                if (change.type === "modified") {
                    if (idx !== -1) {
                        dailyInfo.reservations[idx] = resData;
                        changes = true;
                    } else {
                        // Should verify if we should add it? Yes.
                        dailyInfo.reservations.push(resData);
                        changes = true;
                    }
                }
                if (change.type === "removed") {
                    if (idx !== -1) {
                        dailyInfo.reservations.splice(idx, 1);
                        changes = true;
                    }
                }
            });

            if (changes) {
                console.log("☁️ Reservaciones sincronizadas. Total:", dailyInfo.reservations.length);
                console.log("📊 Reservaciones activas:", dailyInfo.reservations.filter(r => r.status !== 'completed' && r.status !== 'cancelled').length);
                this._save();

                // Refresh UI if necessary
                setTimeout(() => {
                    const activeTag = document.activeElement ? document.activeElement.tagName : '';
                    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

                    if (window.renderManagerDashboard && document.getElementById('manager-reservations-list')) {
                        console.log('🔄 Refreshing Manager Reservations (Auto)');
                        window.renderManagerDashboard('reservations');
                    }
                    if (window.renderHostessReservationList && document.getElementById('hostess-reservations-list')) {
                        console.log('🔄 Refreshing Hostess Reservations (Auto)');
                        window.renderHostessReservationList();
                    }
                }, 100);
            }
        });

        // 6. SYNC MENU (Live 86 status)
        const { doc: fbDoc } = window.FB;
        fbOnSnapshot(fbDoc(window.dbFirestore, 'config', 'menu'), (docItem) => {
            if (docItem.exists()) {
                const remoteMenu = docItem.data();
                // Compare simply or just overwrite
                this.data.menu = remoteMenu;
                this._save();
                console.log("☁️ Menú y Status 86 sincronizados en tiempo real");

                // Refresh dashboards if open
                setTimeout(() => {
                    const activeTag = document.activeElement ? document.activeElement.tagName : '';
                    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

                    // 1. MANAGER UI REFRESH
                    const invModal = document.getElementById('inventory-modal');
                    if (invModal && !invModal.classList.contains('hidden') && typeof window.show86ProductsModal === 'function') {
                        console.log('🔄 Refreshing Manager 86 Modal (Auto)');
                        window.show86ProductsModal();
                        // Also softly re-render the underlying dashboard safely if we are on reports
                        if (window.CURRENT_MANAGER_TAB === 'reports' && typeof window.renderManagerDashboard === 'function') {
                            window.renderManagerDashboard('reports');
                        }
                    } else if (typeof window.renderManagerDashboard === 'function' && document.getElementById('manager-content')) {
                        console.log('🔄 Refreshing Manager UI for Menu update (Auto)');
                        window.renderManagerDashboard(window.CURRENT_MANAGER_TAB || 'tables');
                    }

                    // 2. WAITER UI REFRESH
                    const barraContainer = document.getElementById('inv-barra-container');
                    if (barraContainer && typeof window.renderBarraMenuAdmin === 'function') {
                        console.log('🔄 Refreshing Waiter Gestor 86 (Auto)');
                        window.renderBarraMenuAdmin();
                    } else if (typeof window.renderWaiterDashboard === 'function' && document.getElementById('waitercontent-mesas')) {
                        console.log('🔄 Refreshing Waiter UI for Menu update (Auto)');
                        window.renderWaiterDashboard();
                    }

                    // 3. HOSTESS UI REFRESH
                    if (typeof window.renderHostessDashboard === 'function' && document.getElementById('content-tables')) {
                        console.log('🔄 Refreshing Hostess UI for Menu update (Auto)');
                        window.renderHostessDashboard();
                    }
                }, 100);
            }
        });
    }

    // ON-DEMAND MIGRATION: Push local reservations to Firebase if they aren't there
    _syncLocalReservationsToFirebase() {
        const dailyInfo = this.getDailyInfo();
        const localReservations = dailyInfo.reservations || [];

        if (localReservations.length === 0) {
            console.log('⏭️ No local reservations to sync');
            return;
        }

        console.log(`🚀 Migrating ${localReservations.length} local reservations to cloud...`);

        // Wait a bit for FB to be ready if called instantly
        setTimeout(() => {
            if (!window.dbFirestore || !window.FB) {
                console.warn('⚠️ Firebase not ready for migration');
                return;
            }
            const { doc, setDoc } = window.FB;

            localReservations.forEach(r => {
                // We use setDoc which overwrites/creates using the ID.
                // This ensures that if the Mac has the "master" copy, it pushes it up.
                setDoc(doc(window.dbFirestore, 'reservations', r.id), r)
                    .then(() => console.log(`☁️ Synced reservation: ${r.customerName} (${r.id})`))
                    .catch(e => console.error('🔥 Migration error for', r.id, e));
            });
        }, 3000); // 3s delay to let connection settle
    }

    _syncMenuCatalog() {
        // If menuCatalog doesn't exist in stored data, add it from INITIAL_DATA
        if (!this.data.menuCatalog) {
            this.data.menuCatalog = INITIAL_DATA.menuCatalog;
            this._save();
            console.log('Migrated menuCatalog');
        }
    }

    _syncMenu() {
        // If menu doesn't exist, init from scratch
        if (!this.data.menu) {
            this.data.menu = INITIAL_DATA.menu;
            this._save();
            return;
        }

        // Force update: Inject missing categories (Alitas, Boneless) if they don't exist
        const currentFoods = this.data.menu.alimentos || [];
        const hasAlitas = currentFoods.some(i => i.category === 'Alitas');

        if (!hasAlitas) {
            console.log('Injecting missing Alitas/Boneless categories...');
            const newItems = INITIAL_DATA.menu.alimentos.filter(i =>
                i.category === 'Alitas' || i.category === 'Boneless'
            );
            this.data.menu.alimentos = [...currentFoods, ...newItems];
            this._save();
        }

        // Force update: Inject 'Extras Barra' if missing
        const currentDrinks = this.data.menu.bebidas || [];
        const hasExtrasBarra = currentDrinks.some(i => i.category === 'Extras Barra');

        if (!hasExtrasBarra) {
            console.log('Injecting missing Extras Barra...');
            const newDrinks = INITIAL_DATA.menu.bebidas.filter(i => i.category === 'Extras Barra');
            this.data.menu.bebidas = [...currentDrinks, ...newDrinks];
            this._save();
        }
    }

    _syncUsers() {
        let changed = false;
        INITIAL_DATA.users.forEach(initUser => {
            if (!this.data.users.find(u => u.username === initUser.username)) {
                this.data.users.push(initUser);
                changed = true;
                console.log('Migrated user:', initUser.username);
            }
        });
        if (changed) this._save();
    }

    _load() {
        const s = localStorage.getItem(STORE_KEY);
        if (s) {
            const parsed = JSON.parse(s);
            // CRITICAL FIX: If local data has NO games but initialization expects them,
            // or if structure is old, we might want to merge or reset dailyInfo part.
            // For now, let's just trust it but verify dailyInfo exists.
            if (!parsed.dailyInfo) {
                parsed.dailyInfo = JSON.parse(JSON.stringify(INITIAL_DATA.dailyInfo));
            }
            return parsed;
        }
        return JSON.parse(JSON.stringify(INITIAL_DATA));
    }

    _save() {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(this.data));
            this.notifyListeners();
        } catch (e) {
            console.error('Error saving data:', e);
        }
    }

    login(username, password) {
        const user = this.data.users.find(u => u.username === username && u.password === password);
        return user || null;
    }

    getBranches() {
        return this.data.branches;
    }

    // Hostess Methods
    searchCustomers(query) {
        if (!query || query.length < 2) return [];
        const q = query.toLowerCase();
        return this.data.customers.filter(c =>
            c.firstName.toLowerCase().includes(q) ||
            c.lastName.toLowerCase().includes(q)
        );
    }

    isTableOccupied(table, branchId) {
        const isOcc = this.data.visits.some(v => {
            if (v.branchId !== branchId) return false;
            if (v.status !== 'active') return false;

            // 1. Exact String Match (Trimmed)
            if (String(v.table).trim() === String(table).trim()) return true;

            // 2. Numeric Match (Handle "1" vs "01")
            const vNum = parseInt(v.table);
            const tNum = parseInt(table);
            if (!isNaN(vNum) && !isNaN(tNum) && vNum === tNum) return true;

            return false;
        });

        console.log(`🛡️ Checking Table Occupancy: Input '${table}' @ Branch '${branchId}' -> Result: ${isOcc}`);
        return isOcc;
    }

    // Get available table numbers for a branch based on user position
    getAvailableTables(branchId, userPosition) {
        const branch = this.data.branches.find(b => b.id === branchId);
        if (!branch || !branch.tables) {
            return Array.from({ length: 50 }, (_, i) => i + 1); // Fallback for old data
        }

        let availableTables = [...branch.tables.regular];

        // BARRA staff can also use BARRA tables
        if (userPosition === 'BARRA' && branch.tables.barra.length > 0) {
            availableTables = [...availableTables, ...branch.tables.barra];
        }

        return availableTables.sort((a, b) => a - b);
    }

    // Validate if a table number is valid for a branch and user position
    isValidTable(tableNumber, branchId, userPosition) {
        const availableTables = this.getAvailableTables(branchId, userPosition);
        return availableTables.includes(parseInt(tableNumber));
    }


    createUser(userData) {
        const id = 'U' + Date.now();
        const user = { id, ...userData };
        this.data.users.push(user);
        this._save();
        return user;
    }

    getCustomerById(id) {
        return this.data.customers.find(c => c.id === id);
    }

    createCustomer(data) {
        const id = 'C' + Date.now();
        const customer = { id, ...data, visits: 0, topDrinks: [], topFood: [] };
        this.data.customers.push(customer);
        this._save();

        // SYNC FIREBASE
        if (window.dbFirestore && window.FB) {
            const { doc, setDoc } = window.FB;
            setDoc(doc(window.dbFirestore, 'customers', customer.id), customer)
                .catch(e => console.error('🔥 Customer sync error', e));
        }

        return customer;
    }

    getCustomers(branchId = null) {
        if (branchId) {
            return this.data.customers.filter(c => c.branchId === branchId);
        }
        return this.data.customers;
    }

    updateCustomer(customerId, updates) {
        const idx = this.data.customers.findIndex(c => c.id === customerId);
        if (idx !== -1) {
            this.data.customers[idx] = { ...this.data.customers[idx], ...updates };
            this._save();

            // SYNC FIREBASE
            if (window.dbFirestore && window.FB) {
                const { doc, updateDoc } = window.FB;
                updateDoc(doc(window.dbFirestore, 'customers', customerId), updates)
                    .catch(e => console.error('🔥 Sync update customer error', e));
            }
            return true;
        }
        return false;
    }

    createVisit(visitData) {
        const visit = {
            id: 'V' + Date.now(),
            status: 'active',
            ...visitData
        };
        this.data.visits.push(visit);

        // Update customer visit count
        const cust = this.data.customers.find(c => c.id === visitData.customerId);
        if (cust) {
            cust.visits = (cust.visits || 0) + 1;
        }

        this._save();

        // SYNC TO FIREBASE (WITH VERBOSE LOGGING)
        console.log('📤 Attempting to sync visit to Firebase...', {
            hasFirestore: !!window.dbFirestore,
            hasFB: !!window.FB,
            visitId: visit.id
        });

        if (window.dbFirestore && window.FB) {
            const { doc, setDoc } = window.FB;
            console.log('✅ Firebase available, calling setDoc...');
            setDoc(doc(window.dbFirestore, 'visits', visit.id), visit)
                .then(() => {
                    console.log('🔥✅ Visit synced to cloud successfully!', visit.id);
                })
                .catch(e => {
                    console.error('🔥❌ Sync error:', e);
                    console.error('Visit data:', visit);
                });
        } else {
            console.warn('⚠️ Firebase NOT available for sync!', {
                dbFirestore: window.dbFirestore,
                FB: window.FB
            });
        }

        return visit;
    }

    // MENU MANAGEMENT METHODS
    getMenu() {
        return this.data.menu;
    }

    getMenuItemsByCategory(type, category) {
        // type: 'alimentos' or 'bebidas'
        if (!this.data.menu || !this.data.menu[type]) return [];

        if (category) {
            return this.data.menu[type].filter(item => item.category === category);
        }
        return this.data.menu[type];
    }

    toggleItemAvailability(itemId) {
        // Toggle 86 status for food or beverage item
        let item = this.data.menu.alimentos.find(i => i.id === itemId);
        if (!item) {
            item = this.data.menu.bebidas.find(i => i.id === itemId);
        }

        if (item) {
            item.available = !item.available;
            this._save();

            // SYNC TO FIREBASE
            if (window.dbFirestore && window.FB) {
                const { doc, setDoc } = window.FB;
                // Note: The menu is a large object. We overwrite the entire menu doc to ensure consistency.
                setDoc(doc(window.dbFirestore, 'config', 'menu'), this.data.menu)
                    .then(() => console.log(`☁️ Synced availability for ${item.name} to ${item.available}`))
                    .catch(e => console.error('🔥 Sync toggle item availability error', e));
            }
            return item;
        }
        return null;
    }

    createOrder(orderData) {
        // Create new order for a table
        const order = {
            id: 'O' + Date.now(),
            visitId: orderData.visitId,
            items: orderData.items, // [{itemId, name, quantity, observations}, ...]
            timestamp: new Date().toISOString(),
            status: 'pending' // pending, preparing, delivered
        };
        this.data.orders.push(order);
        this._save();
        return order;
    }

    getOrdersByVisit(visitId) {
        return this.data.orders.filter(o => o.visitId === visitId);
    }

    // --- DEV TOOLS ---
    devInjectMockHistory(customerId) {
        // --- MOCK 1 YEAR HISTORY ---
        const favItems = [
            { id: 'F141', price: 219 }, // Boneless Medium
            { id: 'F030', price: 189 }, // Stadium Burger
            { id: 'B116', price: 75 },  // Heineken Botella
            { id: 'F092', price: 0 }    // Mango Habanero (Salsa)
        ];

        let currentMockDate = new Date();
        currentMockDate.setFullYear(currentMockDate.getFullYear() - 1); // Start 1 year ago
        let count = 0;

        const games = [
            'Super Bowl LVIII',
            'América vs Chivas',
            'Real Madrid vs Barça',
            'Final Champions',
            'Pumas vs Cruz Azul',
            'UFC 300',
            'F1 Gran Premio México'
        ];

        for (let i = 0; i < 20; i++) {
            // Random days jump 5-20 days
            currentMockDate.setDate(currentMockDate.getDate() + Math.floor(Math.random() * 15) + 5);
            if (currentMockDate >= new Date()) break;

            const visitId = 'v_mock_dyn_' + Date.now() + '_' + i;
            const pax = Math.floor(Math.random() * 4) + 2;

            // Random hour between 18 and 23
            currentMockDate.setHours(18 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 59), 0, 0);

            const isGame = i % 3 === 0;

            this.data.visits.push({
                id: visitId,
                customerId: customerId,
                branchId: 'juriquilla',
                table: Math.floor(Math.random() * 20) + 110, // 110-130
                pax: pax,
                status: 'closed',
                waiterId: 'wj1',
                date: currentMockDate.toISOString().split('T')[0],
                startTime: currentMockDate.toISOString(),
                reason: isGame ? 'Partido' : 'Casual',
                gameName: isGame ? games[Math.floor(Math.random() * games.length)] : null,
                totalAmount: favItems.reduce((acc, item) => acc + item.price, 0) + 75 // Adding 1 extra drink
            });

            this.data.orders.push({
                id: 'o_mock_dyn_' + Date.now() + '_' + i,
                visitId: visitId,
                items: [
                    { itemId: 'F141', name: 'Boneless Medium', quantity: 1, price: 219 },
                    { itemId: 'F030', name: 'Stadium Burger', quantity: 1, price: 189 },
                    { itemId: 'B116', name: 'Heineken', quantity: 3, price: 75 },
                    { itemId: 'F092', name: 'Mango Habanero', quantity: 1, price: 0 }
                ],
                timestamp: currentMockDate.toISOString(),
                status: 'delivered'
            });
            count++;
        }

        this._save();
        console.log(`✅ ${count} mock visits and orders injected for customer ${customerId}`);
        return true;
    }

    // New Hostess Management
    getActiveVisitsByBranch(branchId) {
        return (this.data.visits || [])
            .filter(v => v.branchId === branchId && v.status === 'active')
            .map(v => ({
                ...v,
                customer: (this.data.customers || []).find(c => c.id === v.customerId)
            }));
    }

    updateVisitDetails(visitId, updatedFields) {
        const visit = this.data.visits.find(v => v.id === visitId);
        if (visit) {
            // Merge all updated fields into the visit object
            Object.assign(visit, updatedFields);
            console.log('✅ updateVisitDetails called for visit', visitId, 'Updated fields:', updatedFields);
            this._save();

            // INTELLIGENT FEATURE: Auto-learn customer favorite team from gameName
            if (updatedFields.gameName && visit.customerId) {
                const customer = this.data.customers.find(c => c.id === visit.customerId);
                if (customer && (!customer.team || customer.team.trim() === '')) {
                    customer.team = updatedFields.gameName;
                    this._save();
                    if (window.dbFirestore && window.FB) {
                        const { doc, updateDoc } = window.FB;
                        updateDoc(doc(window.dbFirestore, 'customers', customer.id), { team: updatedFields.gameName })
                            .catch(e => console.error('🔥 Error auto-syncing customer team', e));
                    }
                    console.log(`🧠 Auto-learned team for customer ${customer.firstName}: ${updatedFields.gameName}`);
                }
            }

            // SYNC FIREBASE (CRITICAL FIX)
            if (window.dbFirestore && window.FB) {
                const { doc, updateDoc } = window.FB;
                // Only send the updated fields to save bandwidth
                updateDoc(doc(window.dbFirestore, 'visits', visitId), updatedFields)
                    .then(() => console.log('☁️ Synced updated details to Firebase'))
                    .catch(e => console.error('🔥 Sync update details error', e));
            }

            return visit;
        } else {
            console.warn('⚠️ updateVisitDetails: Visit not found:', visitId);
        }
    }

    releaseTable(visitId) {
        const visit = this.data.visits.find(v => v.id === visitId);
        if (visit) {
            visit.status = 'closed'; // Force close/release
            visit.endTime = new Date().toISOString();
            this._save();

            // SYNC FIREBASE
            if (window.dbFirestore && window.FB) {
                const { doc, updateDoc } = window.FB;
                updateDoc(doc(window.dbFirestore, 'visits', visitId), { status: 'closed', endTime: visit.endTime })
                    .catch(e => console.error('🔥 Sync release error', e));
            }
        }
    }

    // Waiter Methods
    getActiveVisits(waiterId) {
        // Return visits assigned to this waiter that are active
        return (this.data.visits || [])
            .filter(v => v.waiterId === waiterId && v.status === 'active')
            .map(v => {
                const customer = (this.data.customers || []).find(c => c.id === v.customerId);
                return { ...v, customer };
            });
    }

    // Close visit and set consumption
    closeVisit(visitId, amount) {
        const visit = this.data.visits.find(v => v.id === visitId);
        if (!visit) return false;

        // Ensure amount is a valid number (default to 0 if not provided)
        const validAmount = amount !== undefined && amount !== null && amount !== '' ? parseFloat(amount) : 0;

        visit.status = 'closed';
        visit.endTime = new Date().toISOString();
        visit.totalAmount = validAmount;

        this._save();

        // SYNC TO FIREBASE
        if (window.dbFirestore && window.FB) {
            const { doc, updateDoc } = window.FB;

            // Prepare update data with only valid fields
            const updateData = {
                status: 'closed',
                endTime: visit.endTime,
                totalAmount: validAmount  // Ensure it's always a number
            };

            updateDoc(doc(window.dbFirestore, 'visits', visitId), updateData)
                .then(() => console.log('✅ Visit closed in cloud'))
                .catch(e => console.error('🔥 Visit close sync error:', e));
        }

        return true;
    }

    updateVisit(visitId, updates) {
        const idx = this.data.visits.findIndex(v => v.id === visitId);
        if (idx !== -1) {
            this.data.visits[idx] = { ...this.data.visits[idx], ...updates };
            this._save();

            // SYNC FIREBASE
            if (window.dbFirestore && window.FB) {
                const { doc, updateDoc } = window.FB;
                updateDoc(doc(window.dbFirestore, 'visits', visitId), updates)
                    .catch(e => console.error('🔥 Sync update error', e));
            }
        }
    }

    markProspect(visitId) {
        const visit = this.data.visits.find(v => v.id === visitId);
        if (visit) {
            visit.isProspect = true;
            this._save();

            // SYNC FIREBASE
            if (window.dbFirestore && window.FB) {
                const { doc, updateDoc } = window.FB;
                updateDoc(doc(window.dbFirestore, 'visits', visitId), { isProspect: true })
                    .catch(e => console.error('🔥 Sync mark prospect error', e));
            }
        }
    }

    // Manager / Admin Methods
    getActiveVisitsGlobal() {
        return (this.data.visits || [])
            .filter(v => v.status === 'active')
            .map(v => ({
                ...v,
                customer: (this.data.customers || []).find(c => c.id === v.customerId),
                branchName: (this.data.branches || []).find(b => b.id === v.branchId)?.name
            }));
    }

    getProspects() {
        // Return visits marked as prospect AND NOT reviewed
        return this.data.visits
            .filter(v => v.isProspect && !v.prospectReviewed)
            .map(v => {
                const customer = this.data.customers.find(c => c.id === v.customerId);
                return { ...v, customer };
            });
    }

    markProspectAsReviewed(visitId) {
        const v = this.data.visits.find(v => v.id === visitId);
        if (v) {
            v.prospectReviewed = true;
            this._save();

            // SYNC FIREBASE
            if (window.dbFirestore && window.FB) {
                const { doc, updateDoc } = window.FB;
                updateDoc(doc(window.dbFirestore, 'visits', visitId), { prospectReviewed: true })
                    .catch(e => console.error('🔥 Sync mark prospect reviewed error', e));
            }
        }
    }

    getBirthdaysToday() {
        const today = new Date();
        const m = (today.getMonth() + 1).toString().padStart(2, '0');
        const d = today.getDate().toString().padStart(2, '0');
        // Match MM-DD in birthday string YYYY-MM-DD
        return this.data.customers.filter(c => c.birthday && c.birthday.endsWith(`${m} - ${d} `));
    }

    getRetentionAlerts() {
        // Mock logic: Customers with > 2 visits who haven't visited in 14 days
        const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;
        const now = Date.now();

        return this.data.customers.filter(c => {
            if ((c.visits || 0) < 2) return false;
            // Find last visit
            const lastVisit = this.data.visits
                .filter(v => v.customerId === c.id)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

            if (!lastVisit) return false;
            return (now - new Date(lastVisit.date).getTime()) > TWO_WEEKS;
        });
    }

    getVisits() {
        return this.data.visits.map(v => ({
            ...v,
            customer: this.data.customers.find(c => c.id === v.customerId)
        }));
    }

    getVisitsByDate(dateStr) {
        // dateStr YYYY-MM-DD
        return this.data.visits.filter(v => {
            const vDate = new Date(v.date).toISOString().split('T')[0];
            return vDate === dateStr;
        }).map(v => ({
            ...v,
            customer: this.data.customers.find(c => c.id === v.customerId)
        }));
    }

    getVisitById(visitId) {
        const v = this.data.visits.find(v => v.id === visitId);
        if (!v) return null;
        const customer = this.data.customers.find(c => c.id === v.customerId);
        return { ...v, customer };
    }

    // Regional Reporting Helpers
    getStatsByBranch(branchId, startDate, endDate) {
        const visits = this.data.visits.filter(v => {
            if (v.branchId !== branchId) return false;
            if (v.status === 'active') return false; // Only count closed for sales? Or both? Let's use closed for sales.
            const d = new Date(v.date);
            return d >= startDate && d <= endDate;
        });

        const totalSales = visits.reduce((acc, v) => acc + Number(v.totalAmount || 0), 0);
        const traffic = visits.length;
        return { totalSales, traffic };
    }

    getActiveTablesCount(branchId) {
        return this.data.visits.filter(v => v.branchId === branchId && v.status === 'active').length;
    }

    // ===== WAITLIST METHODS =====
    addToWaitlist(data) {
        const entry = {
            id: 'W' + Date.now(),
            branchId: data.branchId,
            customerName: data.customerName,
            pax: data.pax,
            phone: data.phone,
            addedAt: new Date().toISOString(),
            estimatedWait: data.estimatedWait || 15,
            notified: false
        };
        this.data.waitlist.push(entry);
        this._save();

        // SYNC FIREBASE
        if (window.dbFirestore && window.FB) {
            const { doc, setDoc } = window.FB;
            setDoc(doc(window.dbFirestore, 'waitlist', entry.id), entry)
                .catch(e => console.error('🔥 Sync waitlist add error', e));
        }

        return entry;
    }

    getWaitlist(branchId) {
        return this.data.waitlist
            .filter(w => w.branchId === branchId && !w.removed)
            .sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
    }

    removeFromWaitlist(id) {
        const idx = this.data.waitlist.findIndex(w => w.id === id);
        if (idx !== -1) {
            this.data.waitlist[idx].removed = true;
            this.data.waitlist[idx].removedAt = new Date().toISOString();
            this._save();

            // SYNC FIREBASE
            if (window.dbFirestore && window.FB) {
                const { doc, updateDoc } = window.FB;
                updateDoc(doc(window.dbFirestore, 'waitlist', id), {
                    removed: true,
                    removedAt: this.data.waitlist[idx].removedAt
                }).catch(e => console.error('🔥 Sync waitlist remove error', e));
            }
        }
    }

    notifyNextInWaitlist(branchId) {
        const next = this.getWaitlist(branchId)[0];
        if (next) {
            next.notified = true;
            this._save();
            return next;
        }
        return null;
    }

    // ===== RESERVATION METHODS =====
    createReservation(data) {
        const reservation = {
            id: 'R' + Date.now(),
            branchId: data.branchId,
            customerName: data.customerName,
            customerId: data.customerId || null,
            phone: data.phone,
            date: data.date, // ISO string
            time: data.time, // HH:MM
            pax: data.pax,
            table: data.table || null,
            status: 'pending', // pending, confirmed, cancelled, completed
            notes: data.notes || '',
            reason: data.reason || '',
            game: data.game || '',
            vip: data.vip || '',
            createdAt: new Date().toISOString()
        };
        this.data.reservations.push(reservation);
        this._save();

        // SYNC FIREBASE
        if (window.dbFirestore && window.FB) {
            const { doc, setDoc } = window.FB;
            setDoc(doc(window.dbFirestore, 'reservations', reservation.id), reservation)
                .catch(e => console.error('🔥 Sync add reservation error', e));
        }

        return reservation;
    }

    getReservations(branchId, date) {
        let filtered = branchId ? this.data.reservations.filter(r => r.branchId === branchId) : this.data.reservations;
        if (date) {
            // Support both ISO date and simple YYYY-MM-DD
            const dateStr = date.includes('T') ? new Date(date).toISOString().split('T')[0] : date;
            filtered = filtered.filter(r => r.date.startsWith(dateStr));
        }
        return filtered.sort((a, b) => {
            const aTime = a.date + 'T' + a.time;
            const bTime = b.date + 'T' + b.time;
            return new Date(aTime) - new Date(bTime);
        });
    }

    confirmReservation(id) {
        const r = this.data.reservations.find(x => x.id === id);
        if (r) {
            r.status = 'confirmed';
            this._save();

            // SYNC FIREBASE
            if (window.dbFirestore && window.FB) {
                const { doc, updateDoc } = window.FB;
                updateDoc(doc(window.dbFirestore, 'reservations', id), { status: 'confirmed' })
                    .catch(e => console.error('🔥 Sync confirm reservation error', e));
            }
        }
    }

    cancelReservation(id) {
        const r = this.data.reservations.find(x => x.id === id);
        if (r) {
            r.status = 'cancelled';
            this._save();

            // SYNC FIREBASE
            if (window.dbFirestore && window.FB) {
                const { doc, updateDoc } = window.FB;
                updateDoc(doc(window.dbFirestore, 'reservations', id), { status: 'cancelled' })
                    .catch(e => console.error('🔥 Sync cancel reservation error', e));
            }
        }
    }

    deleteReservation(id) {
        const idx = this.data.reservations.findIndex(x => x.id === id);
        if (idx !== -1) {
            // Remove local
            this.data.reservations.splice(idx, 1);
            this._save();

            // SYNC FIREBASE (Delete)
            if (window.dbFirestore && window.FB) {
                const { doc, deleteDoc } = window.FB;
                deleteDoc(doc(window.dbFirestore, 'reservations', id))
                    .then(() => console.log('🗑️ Reservation deleted from Cloud'))
                    .catch(e => console.error('🔥 Sync delete reservation error', e));
            }

            // Refresh Manager UI if active
            if (window.renderManagerDashboard) window.renderManagerDashboard('reservations');
            return true;
        }
        return false;
    }

    removeReservation(id) {
        return this.deleteReservation(id);
    }

    // ===== CLIENT CLASSIFICATION =====
    getCustomerClassification(customerId) {
        const customer = this.data.customers.find(c => c.id === customerId);
        if (!customer) return 'none';

        const visits = this.data.visits.filter(v => v.customerId === customerId);
        if (visits.length === 0) return 'new';

        const now = new Date();
        const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
        const twoWeeksAgo = new Date(now - 14 * 24 * 60 * 60 * 1000);

        // Weekly visits
        const visitsThisWeek = visits.filter(v => new Date(v.date) >= oneWeekAgo);
        const visitsLastTwoWeeks = visits.filter(v => new Date(v.date) >= twoWeeksAgo);

        // Total spending
        const totalSpending = visits.reduce((sum, v) => sum + Number(v.totalAmount || 0), 0);
        const avgPerVisit = visits.length > 0 ? totalSpending / visits.length : 0;

        // Weekly spending
        const weeklySpending = visitsThisWeek.reduce((sum, v) => sum + Number(v.totalAmount || 0), 0);

        // Check branches visited
        const branchesVisited = new Set(visits.map(v => v.branchId));
        const multiSucursal = branchesVisited.size > 1;

        // Classification logic
        // Diamond: >1 visita/semana + >$2,500/semana
        if (visitsLastTwoWeeks.length >= 2 && weeklySpending > 2500) {
            return 'diamond';
        }

        // VIP: >$2,500 por visita + múltiples sucursales
        if (avgPerVisit > 2500 && multiSucursal) {
            return 'vip';
        }

        // Blazin: ≥1 visita/semana
        if (visitsThisWeek.length >= 1 && visits.length >= 4) {
            return 'blazin';
        }

        // New: <= 3 visits
        if (visits.length <= 3) {
            return 'new';
        }

        return 'regular';
    }

    getCustomersByClassification(type, branchId = null) {
        let customers = this.data.customers;

        return customers.filter(c => {
            const classification = this.getCustomerClassification(c.id);
            if (classification !== type) return false;

            // Filter by branch if specified
            if (branchId) {
                const hasVisitInBranch = this.data.visits.some(v =>
                    v.customerId === c.id && v.branchId === branchId
                );
                return hasVisitInBranch;
            }
            return true;
        });
    }

    // ===== ADVANCED REPORTING =====
    getTopProducts(type, startDate, endDate, branchId = null) {
        // type: 'entry', 'food', 'drink'
        let visits = this.data.visits.filter(v => {
            const d = new Date(v.date);
            const inRange = (!startDate || d >= startDate) && (!endDate || d <= endDate);
            const inBranch = !branchId || v.branchId === branchId;
            return inRange && inBranch && v.status === 'closed';
        });

        const productCounts = {};
        visits.forEach(v => {
            const customer = this.data.customers.find(c => c.id === v.customerId);
            if (!customer) return;

            let products = [];
            if (type === 'entry') products = customer.topFood || []; // Simplified
            else if (type === 'food') products = customer.topFood || [];
            else if (type === 'drink') products = customer.topDrinks || [];

            products.forEach(p => {
                productCounts[p] = (productCounts[p] || 0) + 1;
            });
        });

        return Object.entries(productCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }

    getBirthdaysThisMonth(branchId = null) {
        const today = new Date();
        const m = (today.getMonth() + 1).toString().padStart(2, '0');

        let customers = this.data.customers.filter(c => {
            if (!c.birthday) return false;
            const match = c.birthday.includes(`- ${m} - `);
            if (!match) return false;

            // Filter by branch if specified
            if (branchId) {
                return this.data.visits.some(v => v.customerId === c.id && v.branchId === branchId);
            }
            return true;
        });

        return customers.map(c => {
            const dayMatch = c.birthday.match(/-(\d{2})\s*$/);
            const day = dayMatch ? parseInt(dayMatch[1]) : 0;
            return { ...c, birthdayDay: day };
        }).sort((a, b) => a.birthdayDay - b.birthdayDay);
    }

    getSportAnalytics(branchId = null) {
        let customers = this.data.customers;
        if (branchId) {
            const customerIdsInBranch = new Set(
                this.data.visits
                    .filter(v => v.branchId === branchId)
                    .map(v => v.customerId)
            );
            customers = customers.filter(c => customerIdsInBranch.has(c.id));
        }

        const teamCounts = {};
        customers.forEach(c => {
            const teams = c.teams || (c.team ? [c.team] : []);
            teams.forEach(t => {
                teamCounts[t] = (teamCounts[t] || 0) + 1;
            });
        });

        return Object.entries(teamCounts)
            .map(([team, count]) => ({ team, count }))
            .sort((a, b) => b.count - a.count);
    }

    getDemographics(branchId = null) {
        let customers = this.data.customers;
        if (branchId) {
            const customerIdsInBranch = new Set(
                this.data.visits
                    .filter(v => v.branchId === branchId)
                    .map(v => v.customerId)
            );
            customers = customers.filter(c => customerIdsInBranch.has(c.id));
        }

        const cityCounts = {};
        const countryCounts = {};
        const colonyCounts = {};

        customers.forEach(c => {
            if (c.city) cityCounts[c.city] = (cityCounts[c.city] || 0) + 1;
            if (c.country) countryCounts[c.country] = (countryCounts[c.country] || 0) + 1;
            if (c.colony) colonyCounts[c.colony] = (colonyCounts[c.colony] || 0) + 1;
        });

        return {
            cities: Object.entries(cityCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
            countries: Object.entries(countryCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
            colonies: Object.entries(colonyCounts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
        };
    }

    getAbsentCustomers(thresholdDays = 30, branchId = null) {
        const threshold = thresholdDays * 24 * 60 * 60 * 1000;
        const now = Date.now();

        return this.data.customers.filter(c => {
            if ((c.visits || 0) < 2) return false;

            const customerVisits = this.data.visits.filter(v => {
                if (v.customerId !== c.id) return false;
                return !branchId || v.branchId === branchId;
            });

            if (customerVisits.length === 0) return false;

            const lastVisit = customerVisits
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

            return (now - new Date(lastVisit.date).getTime()) > threshold;
        });
    }

    // ===== NEW REPORTING METHODS (Step 2) =====

    getCustomersByType(type, startDate, endDate, branchId = null) {
        // Types: 'diamond', 'blazin', 'new', 'absent', 'couch_card'
        // Filter by date range? For 'new', yes (joined in date range).
        // For 'diamond', 'blazin' -> Status within range? Or current status?
        // Usually reports allow seeing WHO was Diamond in that period, but current status is easier.
        // Let's filter by: Active in that period + Current Status matches type.

        let customers = this.data.customers;

        // 1. Filter by Activity in Date Range (if provided)
        if (startDate && endDate) {
            const activeCustomerIds = new Set(this.data.visits
                .filter(v => {
                    const d = new Date(v.date);
                    return d >= new Date(startDate) && d <= new Date(endDate);
                })
                .map(v => v.customerId));

            customers = customers.filter(c => activeCustomerIds.has(c.id));
        }

        // 2. Filter by Type
        return customers.filter(c => {
            if (type === 'couch_card') return c.couchCard === true;

            const classification = this.getCustomerClassification(c.id);
            if (type === 'absent') return false; // Handled separately usually, or use getAbsent

            // For 'new', check if first visit is in range?
            if (type === 'new') {
                // Simplification: classification 'new' means <= 3 visits total.
                return classification === 'new';
            }

            return classification === type;
        });
    }

    getCustomerBranchVisits(startDate, endDate) {
        // Returns list of customers with visit counts per branch
        const result = {}; // { custId: { name, phone, juriquilla: 5, paseo: 2 ... } }

        const visits = this.data.visits.filter(v => {
            const d = new Date(v.date);
            return (!startDate || d >= new Date(startDate)) && (!endDate || d <= new Date(endDate));
        });

        visits.forEach(v => {
            if (!result[v.customerId]) {
                const c = this.data.customers.find(x => x.id === v.customerId);
                if (c) {
                    result[v.customerId] = {
                        name: c.firstName + ' ' + c.lastName,
                        phone: c.phone || 'N/A',
                        total: 0,
                        branches: {}
                    };
                }
            }

            if (result[v.customerId]) {
                const entry = result[v.customerId];
                entry.total++;
                entry.branches[v.branchId] = (entry.branches[v.branchId] || 0) + 1;
            }
        });

        return Object.values(result).sort((a, b) => b.total - a.total);
    }

    getDemographicReport(type, startDate, endDate) {
        // type: 'city', 'country', 'birthday' (birthday filtered by month in range?)

        // Filter active customers in range
        const activeVisits = this.data.visits.filter(v => {
            const d = new Date(v.date);
            return (!startDate || d >= new Date(startDate)) && (!endDate || d <= new Date(endDate));
        });
        const activeCustIds = new Set(activeVisits.map(v => v.customerId));
        const customers = this.data.customers.filter(c => activeCustIds.has(c.id));

        const counts = {};

        customers.forEach(c => {
            let key = 'Desconocido';
            if (type === 'city') key = c.city || 'Desconocido';
            if (type === 'country') key = c.country || 'Desconocido';

            if (type === 'birthday') {
                // Group by Month?
                // User wants "Cumpleaños del mes ... filtrar por periodo"
                // Just list them?
                // Let's return the list directly for birthday
                return;
            }

            counts[key] = (counts[key] || 0) + 1;
        });

        if (type === 'birthday') {
            // Return customers whose birthday (month-day) falls in selected date range
            if (!startDate || !endDate) return [];

            const start = new Date(startDate);
            const end = new Date(endDate);

            return this.data.customers.filter(c => {
                if (!c.birthday) return false;

                // Parse birthday "YYYY-MM-DD"
                const parts = c.birthday.split('-');
                if (parts.length < 3) return false;

                const month = parseInt(parts[1]) - 1; // 0-indexed
                const day = parseInt(parts[2]);

                // Create date in current year for comparison
                const currentYear = new Date().getFullYear();
                const birthdayThisYear = new Date(currentYear, month, day);

                // Create comparable dates (same year) from start/end range
                const startCompare = new Date(currentYear, start.getMonth(), start.getDate());
                const endCompare = new Date(currentYear, end.getMonth(), end.getDate());

                // Check if birthday falls within the month-day range
                return birthdayThisYear >= startCompare && birthdayThisYear <= endCompare;
            }).map(c => ({ name: c.firstName + ' ' + c.lastName, birthday: c.birthday, phone: c.phone, branch: 'N/A' }));
        }

        return Object.entries(counts)
            .map(([label, value]) => ({ label, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 10);
    }

    getMostVisitedBranch(customerId) {
        // Calculate which branch this customer visits most
        const visits = this.data.visits.filter(v => v.customerId === customerId);
        if (visits.length === 0) return 'N/A';

        const branchCounts = {};
        visits.forEach(v => {
            branchCounts[v.branchId] = (branchCounts[v.branchId] || 0) + 1;
        });

        // Find max
        let maxBranch = null;
        let maxCount = 0;
        Object.entries(branchCounts).forEach(([branchId, count]) => {
            if (count > maxCount) {
                maxCount = count;
                maxBranch = branchId;
            }
        });

        // Return branch name
        const branch = this.data.branches.find(b => b.id === maxBranch);
        return branch ? branch.name : maxBranch || 'N/A';
    }

    // ===== CAMPAIGN MANAGEMENT =====
    createCampaign(data) {
        const campaign = {
            id: 'CAMP' + Date.now(),
            name: data.name,
            segment: data.segment, // 'vip', 'loyal', 'new', 'risk', 'all'
            message: data.message,
            imageUrl: data.imageUrl || null,
            branchId: data.branchId || null, // null = all branches
            customerIds: data.customerIds || [],
            sentCount: 0,
            createdAt: new Date().toISOString(),
            createdBy: data.createdBy
        };
        this.data.campaigns.push(campaign);
        this._save();
        return campaign;
    }

    getCampaigns(branchId = null) {
        if (!branchId) return this.data.campaigns;
        return this.data.campaigns.filter(c => !c.branchId || c.branchId === branchId);
    }

    trackCampaignSend(customerId, campaignType) {
        // Track that we sent a message
        console.log(`Campaign sent to ${customerId}: ${campaignType}`);
    }

    // === DAILY INFO METHODS (Enhanced) ===
    getMatches() {
        // RETURN ALL games regardless of date.
        // It's better to show yesterday's game than nothing.
        // The manager is responsible for deleting old games.
        const games = this.getDailyInfo().games || [];
        console.log(`Getting matches: found ${games.length} games.`, games);
        return games;
    }

    getDailyInfo() {
        if (!this.data.dailyInfo) {
            this.data.dailyInfo = {
                games: [],
                gameRequests: [], // New: Requests from Hostess
                promoCatalog: [],
                activePromoIds: [],
                dynamicCatalog: [],
                activeDynamic: null,
                products: { outOfStock86: [], lowStock85: [], push: [] }
            };
            this._save();
        }
        // Ensure products structure exists
        if (!this.data.dailyInfo.products) {
            this.data.dailyInfo.products = { outOfStock86: [], lowStock85: [], push: [] };
            this._save();
        }
        // Ensure games array exists
        if (!this.data.dailyInfo.games) {
            this.data.dailyInfo.games = [];
        }
        // Ensure promo catalog exists
        if (!this.data.dailyInfo.promoCatalog) {
            this.data.dailyInfo.promoCatalog = [];
        }
        if (!this.data.dailyInfo.activePromoIds) {
            this.data.dailyInfo.activePromoIds = [];
        }

        // BACKWARDS COMPATIBILITY: Create aliases for old code that still uses old property names
        // This prevents errors when legacy code tries to access dailyInfo.promos, dailyInfo.products86, etc.
        const info = this.data.dailyInfo;

        // Legacy alias: promos -> active promos from catalog
        if (!info.promos) {
            Object.defineProperty(info, 'promos', {
                get: () => (info.promoCatalog || []).filter(p => (info.activePromoIds || []).includes(p.id)),
                configurable: true
            });
        }

        // Legacy alias: products86 -> products.outOfStock86
        if (!info.products86) {
            Object.defineProperty(info, 'products86', {
                get: () => info.products?.outOfStock86 || [],
                configurable: true
            });
        }

        // Legacy alias: dynamics
        if (!info.dynamics) {
            Object.defineProperty(info, 'dynamics', {
                get: () => ({
                    active: info.activeDynamic ? {
                        ...((info.dynamicCatalog || []).find(d => d.id === info.activeDynamic?.catalogId) || {}),
                        ...(info.activeDynamic || {})
                    } : null,
                    leaderboard: info.activeDynamic?.scores || []
                }),
                configurable: true
            });
        }

        return this.data.dailyInfo;
    }

    // Get active promos for today (for waiter view)
    getActivePromos() {
        const info = this.getDailyInfo();
        if (!info.promoCatalog || !info.activePromoIds) return [];
        return info.promoCatalog.filter(p => info.activePromoIds.includes(p.id));
    }

    // Get active dynamic with merged data
    getActiveDynamic() {
        const info = this.getDailyInfo();
        if (!info.activeDynamic || !info.activeDynamic.catalogId) return null;
        const catalog = info.dynamicCatalog || [];
        const dynamicDef = catalog.find(d => d.id === info.activeDynamic.catalogId);
        if (!dynamicDef) return null;
        return {
            ...dynamicDef,
            scores: info.activeDynamic.scores || []
        };
    }

    // Get all waiters for scoring
    getWaiters() {
        return this.data.users.filter(u => u.role === 'waiter');
    }

    // === GAMES ===
    updateDailyGames(games) {
        const info = this.getDailyInfo();
        info.games = games;

        console.log('🔥 BEFORE Firebase sync - games array:', JSON.stringify(games.slice(-3), null, 2));

        this._save();

        // SYNC FIREBASE - CRITICAL FIX: Use 'allGames' collection instead of 'daily'
        // 'daily' collection was forcing all dates to TODAY (2026-01-27)
        // SYNC FIREBASE - RE-ENABLED (Sanitized)
        if (window.dbFirestore && window.FB) {
            const { doc, setDoc } = window.FB;
            // CRITICAL: Sanitize data to remove 'undefined' values which crash Firebase
            const cleanGames = JSON.parse(JSON.stringify(info.games));
            const dataToSync = { games: cleanGames };

            console.log('🔥 SYNCING to Firebase (allGames collection):', JSON.stringify(dataToSync.games.slice(-3), null, 2));

            // Use 'allGames' collection which supports any date
            setDoc(doc(window.dbFirestore, 'config', 'allGames'), dataToSync, { merge: true })
                .then(() => {
                    console.log('🔥 Firebase sync SUCCESS to allGames');
                })
                .catch(e => console.error('🔥 Sync update games error', e));
        }
    }

    // Request a game to be added (Hostess -> Manager)
    requestGame(gameName) {
        if (!gameName) return;

        // CRITICAL FIX: Robust Deduplication (Case insensitive + Trim)
        const info = this.getDailyInfo();
        const normalizedName = gameName.trim().toLowerCase();

        const existingReq = (info.gameRequests || []).find(r =>
            (r.name || '').trim().toLowerCase() === normalizedName
        );

        if (existingReq) {
            console.log("⚠️ Duplicate request blocked:", gameName);
            if (typeof alert === 'function') alert("⚠️ Esta solicitud ya fue enviada anteriormente.");
            return;
        }

        const newReq = {
            id: 'req_' + Date.now(),
            gameName: gameName, // CORRECTED PROPERTY NAME to match usage elsewhere
            name: gameName, // Maintain legacy for safety
            createdAt: new Date().toISOString()
        };

        if (!info.gameRequests) info.gameRequests = [];
        info.gameRequests.push(newReq);
        this._save();

        // Sync to Firebase (Use allGames)
        // Sync to Firebase (Use allGames) - RE-ENABLED (Sanitized)
        if (window.dbFirestore && window.FB) {
            const { doc, setDoc } = window.FB;
            const docRef = doc(window.dbFirestore, 'config', 'allGames');

            // CRITICAL: Sanitize
            const cleanRequests = JSON.parse(JSON.stringify(info.gameRequests));

            // Use setDoc with merge 
            setDoc(docRef, { gameRequests: cleanRequests }, { merge: true })
                .then(() => {
                    console.log('📨 Game Request sent to Manager:', gameName);
                    if (typeof alert === 'function') alert(`✅ Solicitud enviada al Gerente: "${gameName}"`);
                }).catch(e => console.error('🔥 Error sending game request:', e));
        }
    }

    // NEW: Remove Game Request (Manager -> Dismiss)
    removeGameRequest(reqId) {
        const info = this.getDailyInfo();
        if (!info.gameRequests) return;

        info.gameRequests = info.gameRequests.filter(r => r.id !== reqId);
        this._save();
        this.updateDailyGames(info.games); // Reuse sync logic or direct update

        // Manual Sync for Requests to be sure
        // Manual Sync for Requests to be sure - RE-ENABLED (Sanitized)
        if (window.dbFirestore && window.FB) {
            const { doc, setDoc } = window.FB;
            const docRef = doc(window.dbFirestore, 'config', 'allGames');
            const cleanRequests = JSON.parse(JSON.stringify(info.gameRequests));
            setDoc(docRef, { gameRequests: cleanRequests }, { merge: true })
                .then(() => console.log('🗑️ Request removed:', reqId))
                .catch(e => console.error('Error removing req:', e));
        }
    }

    // --- RESERVATIONS SYSTEM ---

    //     getReservations() {
    //         return this.getReservationsByBranch ? this.getReservationsByBranch(STATE.branch?.id) : this.data.reservations;
    //     }

    addReservation(data) {
        // Standardize to global system A
        return this.createReservation(data);
    }

    updateReservation(resId, updates) {
        // Target the global reservations array (System A)
        const idx = this.data.reservations.findIndex(r => r.id === resId);
        if (idx === -1) {
            console.warn('⚠️ updateReservation: Reservation not found:', resId);
            return false;
        }

        // Update local
        Object.assign(this.data.reservations[idx], updates);
        this._save();

        // SYNC TO FIREBASE
        if (window.dbFirestore && window.FB) {
            const { doc, updateDoc } = window.FB;
            updateDoc(doc(window.dbFirestore, 'reservations', resId), updates)
                .then(() => {
                    console.log('🔄 Reservation updated in cloud:', resId);
                })
                .catch(e => console.error('🔥 Reservation update error:', e));
        }

        return true;
    }

    removeReservation(resId) {
        const info = this.getDailyInfo();
        if (!info.reservations) return;

        info.reservations = info.reservations.filter(r => r.id !== resId);
        this._save();

        // SYNC TO FIREBASE - Delete from reservations collection
        if (window.dbFirestore && window.FB) {
            const { doc, deleteDoc } = window.FB;
            deleteDoc(doc(window.dbFirestore, 'reservations', resId))
                .then(() => console.log('🗑️ Reservation deleted from cloud'))
                .catch(e => console.error('🔥 Reservation delete error:', e));
        }
    }

    addGame(arg1) {
        // Advanced Signature: addGame({ date, time, sport, league, homeTeam, awayTeam, match, tvs, audio })
        let gameData = arg1;

        console.log('🎯 addGame received gameData:', gameData);
        console.log('📅 gameData.date:', gameData.date);

        // CRITICAL FIX: Don't use toLocaleDateString - it causes timezone bugs
        // Ensure date is treated as LOCAL, not UTC.
        // Appending T12:00:00 ensures it falls in the middle of the day for any American/European timezone
        let finalDate = gameData.date;
        if (finalDate && finalDate.length === 10) {
            // Keep it as is, it's already YYYY-MM-DD
        } else if (!finalDate) {
            // Only if no date provided, create today's date manually
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            finalDate = `${year} - ${month} - ${day}`;
        }

        // Validation / Defaults
        const newGame = {
            id: 'game_' + Date.now(),
            date: finalDate, // Now strictly YYYY-MM-DD
            time: gameData.time || '12:00',
            sport: gameData.sport || 'Futbol',
            league: gameData.league || 'Amistoso',
            homeTeam: gameData.homeTeam || '',
            awayTeam: gameData.awayTeam || '',
            match: gameData.match || '',
            mainEvent: gameData.mainEvent || '', // Pelea/partido estelar (UFC, Tenis, Box)
            tvs: gameData.tvs || '',
            audio: gameData.audio || { salon: false, terraza: false }
        };

        console.log('💾 Final newGame.date:', newGame.date);

        // LEARNING PHASE
        if (window.KNOWN_TEAMS) {
            this.learnTeams(newGame.homeTeam);
            this.learnTeams(newGame.awayTeam);
        }

        // AUTO-RESOLVE REQUESTS (Moved after object creation)
        const info = this.getDailyInfo();
        const pendingRequests = info.gameRequests || [];

        // Match logic
        const gameFullName = newGame.match || `${newGame.homeTeam} vs ${newGame.awayTeam}`;
        const normalizedGameName = gameFullName.trim().toLowerCase();

        const matchedReqs = pendingRequests.filter(r => {
            const reqName = (r.gameName || r.name || '').trim().toLowerCase();
            // 1. Direct Match
            if (reqName === normalizedGameName) return true;
            // 2. Partial Match
            if (normalizedGameName.includes(reqName) && reqName.length > 4) return true;
            return false;
        });

        if (matchedReqs.length > 0) {
            console.log(`✅ Auto - resolving ${matchedReqs.length} pending requests for "${gameFullName}"`);
            info.gameRequests = pendingRequests.filter(r => !matchedReqs.includes(r));
        } else {
            if (!info.gameRequests) info.gameRequests = []; // Ensure array exists
        }

        if (!info.games) info.games = [];
        info.games.push(newGame);
        this._save();

        this.updateDailyGames(info.games);

        // SYNC: RE-ENABLED (Sanitized)
        if (window.dbFirestore && window.FB && matchedReqs.length > 0) {
            const { doc, setDoc } = window.FB;
            const docRef = doc(window.dbFirestore, 'config', 'allGames');
            const cleanRequests = JSON.parse(JSON.stringify(info.gameRequests));
            setDoc(docRef, { gameRequests: cleanRequests }, { merge: true })
        }

        return newGame;
    }

    // New Helpers for Game Management
    updateGameTime(gameId, newTime) {
        const game = (this.data.dailyInfo.games || []).find(g => g.id === gameId);
        if (game) {
            game.time = newTime;
            this.updateDailyGames(this.data.dailyInfo.games);
        }
    }

    updateGameTVs(gameId, tvString) {
        const game = (this.data.dailyInfo.games || []).find(g => g.id === gameId);
        if (game) {
            game.tvs = tvString;
            this.updateDailyGames(this.data.dailyInfo.games);
        }
    }

    setGameAudio(gameId, zone, state) {
        // Zone: 'salon' | 'terraza'
        // State: true | false
        const games = this.data.dailyInfo.games || [];
        const game = games.find(g => g.id === gameId);

        if (game) {
            // Logic: If turning ON, turn OFF for all others in that zone (Exclusive Audio)
            if (state === true) {
                games.forEach(g => {
                    if (g.audio) g.audio[zone] = false;
                });
            }

            // Now set target
            if (!game.audio) game.audio = { salon: false, terraza: false };
            game.audio[zone] = state;

            this.updateDailyGames(games);
        }
    }

    learnTeams(teamName) {
        if (!teamName || teamName === 'Local' || teamName === 'Visitante' || !window.KNOWN_TEAMS) return;

        // Normalize check
        const normalized = teamName.trim();

        if (!window.KNOWN_TEAMS.includes(normalized)) {
            console.log(`🧠 Learning new team: ${normalized} `);
            window.KNOWN_TEAMS.push(normalized);
            window.KNOWN_TEAMS.sort();

            // Update UI
            if (typeof window.updateTeamDatalist === 'function') window.updateTeamDatalist();

            // Sync to Cloud
            if (window.dbFirestore && window.FB) {
                const { doc, setDoc, arrayUnion } = window.FB;
                const configRef = doc(window.dbFirestore, 'config', 'teams');
                setDoc(configRef, {
                    list: arrayUnion(normalized)
                }, { merge: true }).catch(e => console.error('🔥 Error learning team:', e));
            }
        }
    } deleteGame(index) {
        const info = this.getDailyInfo();
        info.games.splice(index, 1);
        this.updateDailyGames(info.games);
    }

    // === PROMOS ===
    addPromoToCatalog(title, description) {
        const info = this.getDailyInfo();
        if (!info.promoCatalog) info.promoCatalog = [];
        const id = 'pc' + Date.now();
        info.promoCatalog.push({ id, title, description, createdAt: new Date().toISOString() });
        this._save();
        return id;
    }

    deletePromoFromCatalog(promoId) {
        const info = this.getDailyInfo();
        info.promoCatalog = (info.promoCatalog || []).filter(p => p.id !== promoId);
        info.activePromoIds = (info.activePromoIds || []).filter(id => id !== promoId);
        this._save();
    }

    togglePromoActive(promoId) {
        const info = this.getDailyInfo();
        if (!info.activePromoIds) info.activePromoIds = [];
        const idx = info.activePromoIds.indexOf(promoId);
        if (idx >= 0) {
            info.activePromoIds.splice(idx, 1);
        } else {
            info.activePromoIds.push(promoId);
        }
        this._save();
    }

    // === DYNAMICS ===
    addDynamicToCatalog(title, description, metric) {
        const info = this.getDailyInfo();
        if (!info.dynamicCatalog) info.dynamicCatalog = [];
        const id = 'dc' + Date.now();
        info.dynamicCatalog.push({ id, title, description, metric, createdAt: new Date().toISOString() });
        this._save();
        return id;
    }

    deleteDynamicFromCatalog(dynamicId) {
        const info = this.getDailyInfo();
        info.dynamicCatalog = (info.dynamicCatalog || []).filter(d => d.id !== dynamicId);
        if (info.activeDynamic && info.activeDynamic.catalogId === dynamicId) {
            info.activeDynamic = null;
        }
        this._save();
    }

    activateDynamic(catalogId) {
        const info = this.getDailyInfo();
        // Initialize scores with all waiters at 0
        const waiters = this.getWaiters();
        info.activeDynamic = {
            catalogId,
            date: new Date().toISOString().split('T')[0],
            scores: waiters.map(w => ({
                odoo_id: w.odoo_id,
                waiterName: w.name,
                score: 0
            }))
        };
        this._save();
    }

    deactivateDynamic() {
        const info = this.getDailyInfo();
        info.activeDynamic = null;
        this._save();
    }

    // === INTELLIGENT REPORTS: CUSTOMER 360 & LTV ===
    getCustomerLTV(customerId) {
        if (!customerId) return { totalSpend: 0, avgTicket: 0, visitCount: 0, lastVisit: null, preferredItem: 'N/A' };

        // Find all visits for this customer (completed or active)
        const customerVisits = (this.data.visits || []).filter(v => v.customerId === customerId);

        let totalSpend = 0;
        let itemCounts = {};

        // Sum up orders for each visit
        customerVisits.forEach(visit => {
            const visitOrders = (this.data.orders || []).filter(o => o.visitId === visit.id);
            visitOrders.forEach(order => {
                // Sum price
                const itemTotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                totalSpend += itemTotal;

                // Track preferred item
                order.items.forEach(item => {
                    if (!itemCounts[item.name]) itemCounts[item.name] = 0;
                    itemCounts[item.name] += item.quantity;
                });
            });
        });

        const visitCount = customerVisits.length;
        const avgTicket = visitCount > 0 ? (totalSpend / visitCount) : 0;

        // Determine last visit date
        const sortedVisits = [...customerVisits].sort((a, b) => new Date(b.date) - new Date(a.date));
        const lastVisit = sortedVisits.length > 0 ? sortedVisits[0].date : null;

        // Determine preferred item
        let preferredItem = 'Sin Datos';
        let maxCount = 0;
        for (const [name, count] of Object.entries(itemCounts)) {
            if (count > maxCount) {
                maxCount = count;
                preferredItem = name;
            }
        }

        return {
            totalSpend: totalSpend,
            avgTicket: avgTicket,
            visitCount: visitCount,
            lastVisit: lastVisit,
            preferredItem: preferredItem
        };
    }

    getAtRiskCustomers() {
        const today = new Date();
        const atRisk = [];

        (this.data.customers || []).forEach(customer => {
            const ltv = this.getCustomerLTV(customer.id);
            if (ltv.visitCount < 2 || !ltv.lastVisit) return; // Ignore new/single-visit customers

            // Calculate days since last visit
            const lastVisitDate = new Date(ltv.lastVisit);
            // Ensure valid date
            if (isNaN(lastVisitDate.getTime())) return;

            const diffTime = Math.abs(today - lastVisitDate);
            const daysSinceLastVisit = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Determine first visit to calculate frequency
            const customerVisits = (this.data.visits || []).filter(v => v.customerId === customer.id);
            const sortedVisits = [...customerVisits].sort((a, b) => new Date(a.date) - new Date(b.date));
            const firstVisitDate = new Date(sortedVisits[0].date);
            if (isNaN(firstVisitDate.getTime())) return;

            const customerLifespanDays = Math.max(1, Math.ceil(Math.abs(today - firstVisitDate) / (1000 * 60 * 60 * 24)));
            const monthsLifespan = Math.max(1, customerLifespanDays / 30);

            // Frequency: Visits per month
            const visitsPerMonth = ltv.visitCount / monthsLifespan;

            // Churn Logic: Frequency >= 2/month AND Absent > 21 days
            if (visitsPerMonth >= 2 && daysSinceLastVisit > 21) {
                atRisk.push({
                    customer: customer,
                    daysAbsent: daysSinceLastVisit,
                    frequency: visitsPerMonth.toFixed(1),
                    preferredItem: ltv.preferredItem,
                    totalSpend: ltv.totalSpend
                });
            }
        });

        // Sort by highest value (Total Spend) first
        return atRisk.sort((a, b) => b.totalSpend - a.totalSpend);
    }

    getMatchTargets() {
        // Cross-references upcoming scheduled games with customer's favorite teams
        const matches = this.getMatches();
        const targets = [];

        // Find customers with a defined favorite team
        const fanCustomers = (this.data.customers || []).filter(c => c.team && c.team.trim() !== '');

        matches.forEach(match => {
            const matchName = (match.match || '').toLowerCase();
            const homeStr = (match.homeTeam || '').toLowerCase();
            const awayStr = (match.awayTeam || '').toLowerCase();

            // Find customers whose favorite team matches either home or away
            const matchedFans = fanCustomers.filter(c => {
                const fanTeam = c.team.toLowerCase();
                if (!fanTeam) return false;

                let isMatch = false;
                if (homeStr && (homeStr.includes(fanTeam) || fanTeam.includes(homeStr))) isMatch = true;
                if (awayStr && (awayStr.includes(fanTeam) || fanTeam.includes(awayStr))) isMatch = true;
                if (matchName && (matchName.includes(fanTeam) || fanTeam.includes(matchName))) isMatch = true;

                return isMatch;
            });

            if (matchedFans.length > 0) {
                // Calculate potential revenue for this specific match based on fans' LTV averages
                let potentialRevenue = 0;
                const fanDetails = matchedFans.map(c => {
                    const ltv = this.getCustomerLTV(c.id);
                    potentialRevenue += ltv.avgTicket;
                    return {
                        name: `${c.firstName} ${c.lastName}`,
                        phone: c.phone || 'N/A',
                        team: c.team,
                        avgTicket: ltv.avgTicket
                    };
                });

                // Sort fans by value
                fanDetails.sort((a, b) => b.avgTicket - a.avgTicket);

                const title = match.match || (match.homeTeam && match.awayTeam ? `${match.homeTeam} vs ${match.awayTeam}` : match.homeTeam || match.league || 'Evento Especial');

                targets.push({
                    gameId: match.id,
                    matchTitle: title,
                    league: match.league,
                    date: match.date,
                    time: match.time,
                    fanCount: matchedFans.length,
                    potentialRevenue: potentialRevenue,
                    fans: fanDetails
                });
            }
        });

        // Sort by highest potential revenue
        return targets.sort((a, b) => b.potentialRevenue - a.potentialRevenue);
    }

    getZoneLoyaltyRanking() {
        const zoneMap = {};

        (this.data.customers || []).forEach(customer => {
            const zone = (customer.city && customer.city.trim() !== '') ? customer.city : 'Desconocida';
            const ltv = this.getCustomerLTV(customer.id);

            if (ltv.visitCount === 0 || ltv.totalSpend === 0) return;

            if (!zoneMap[zone]) {
                zoneMap[zone] = {
                    zone: zone,
                    customerCount: 0,
                    totalRevenue: 0,
                    totalTickets: 0
                };
            }

            zoneMap[zone].customerCount += 1;
            zoneMap[zone].totalRevenue += ltv.totalSpend;
            zoneMap[zone].totalTickets += ltv.visitCount;
        });

        // Convert map to array and compute averages
        const ranking = Object.values(zoneMap).map(z => {
            return {
                ...z,
                avgTicketZone: z.totalTickets > 0 ? (z.totalRevenue / z.totalTickets) : 0,
                avgCLV: z.customerCount > 0 ? (z.totalRevenue / z.customerCount) : 0
            };
        });

        // Sort by highest total revenue
        return ranking.sort((a, b) => b.totalRevenue - a.totalRevenue);
    }

    getTimePeriodMetrics(startDateStr, endDateStr) {
        // Formatos esperados: YYYY-MM-DD
        const start = new Date(startDateStr);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDateStr);
        end.setHours(23, 59, 59, 999);

        // Filtrar visitas en el rango
        const periodVisits = (this.data.visits || []).filter(v => {
            if (!v.date) return false;
            const vDate = new Date(v.date);
            return vDate >= start && vDate <= end;
        });

        const metrics = {
            totalVisits: periodVisits.length,
            newCustomers: 0,
            returningCustomers: 0,
            motives: {
                comer: 0,
                tragos: 0,
                partido: 0,
                'cumpleaños': 0, // Using string key since JS accepts this
                negocios: 0
            },
            totalPax: 0
        };

        const processedCustomers = new Set();

        periodVisits.forEach(visit => {
            metrics.totalPax += (parseInt(visit.pax) || 0);

            // Contar motivos (soporte para visit.reason y visit.visitReason)
            const reason = (visit.visitReason || visit.reason || 'comer').toLowerCase();
            // Need to handle missing accents or slight variations
            let mappedReason = reason;
            if (reason.includes('cumple')) mappedReason = 'cumpleaños';
            else if (reason.includes('comer')) mappedReason = 'comer';
            else if (reason.includes('trago')) mappedReason = 'tragos';
            else if (reason.includes('partido')) mappedReason = 'partido';
            else if (reason.includes('negocio')) mappedReason = 'negocios';
            else mappedReason = 'comer'; // Fallback so no visits are lost

            if (metrics.motives[mappedReason] !== undefined) {
                metrics.motives[mappedReason]++;
            } else {
                metrics.motives.comer++;
            }


            // Determinar si es nuevo o recurrente (basado en el historial completo, no solo en este periodo)
            if (visit.customerId && !processedCustomers.has(visit.customerId)) {
                processedCustomers.add(visit.customerId);

                // Buscar TODAS las visitas de este cliente
                const allCustomerVisits = (this.data.visits || []).filter(v => v.customerId === visit.customerId).sort((a, b) => new Date(a.date) - new Date(b.date));

                // Si la visita más antigua no cae en este rango, o si tiene más de 1 visita en general ANTES de esta, es recurrente.
                // Simplificación: Si su primera visita (oldest) sucedió en o después de 'start' date, y no hay visitas antes, es NUEVO. Si tuvo visitas antes de 'start', es RECURRENTE.
                if (allCustomerVisits.length > 0) {
                    const firstVisitDate = new Date(allCustomerVisits[0].date);
                    if (firstVisitDate < start) {
                        metrics.returningCustomers++;
                    } else {
                        metrics.newCustomers++;
                    }
                }
            } else if (!visit.customerId) {
                // Walk-ins sin registro asumidos como nuevos para la métrica rápida
                metrics.newCustomers++;
            }
        });

        return metrics;
    }

    getVisitReasonConversion() {
        // Tracks how many customers came first for a game, and then returned for regular dining
        let sportsProspectsCount = 0;
        let convertedToDinersCount = 0;
        const conversionList = [];

        (this.data.customers || []).forEach(customer => {
            const customerVisits = (this.data.visits || [])
                .filter(v => v.customerId === customer.id)
                .sort((a, b) => new Date(a.date) - new Date(b.date)); // Oldest first

            if (customerVisits.length < 2) return;

            let cameForGame = false;
            let returnedToDine = false;

            for (const visit of customerVisits) {
                const r = (visit.visitReason || visit.reason || '').toLowerCase();

                // If they ever came for a game, tag them
                if (r === 'partido' || (visit.comments && visit.comments.toLowerCase().includes('partido'))) {
                    cameForGame = true;
                }

                // If they already came for a game previously, but THIS visit is just for dining
                if (cameForGame && (r === 'comer' || r === 'tragos')) {
                    returnedToDine = true;
                }
            }

            if (cameForGame) {
                sportsProspectsCount++;
                if (returnedToDine) {
                    convertedToDinersCount++;
                    const ltv = this.getCustomerLTV(customer.id);
                    conversionList.push({
                        customer: customer,
                        totalVisits: customerVisits.length,
                        totalSpend: ltv.totalSpend
                    });
                }
            }
        });

        // Sort the success cases by value
        conversionList.sort((a, b) => b.totalSpend - a.totalSpend);

        const rate = sportsProspectsCount > 0 ? (convertedToDinersCount / sportsProspectsCount) * 100 : 0;

        return {
            totalSportsProspects: sportsProspectsCount,
            convertedToDiners: convertedToDinersCount,
            conversionRateText: `${rate.toFixed(1)}%`,
            list: conversionList
        };
    }

    updateWaiterScore(odoo_id, newScore) {
        const info = this.getDailyInfo();
        if (!info.activeDynamic || !info.activeDynamic.scores) return;
        const entry = info.activeDynamic.scores.find(s => s.odoo_id === odoo_id);
        if (entry) {
            entry.score = parseInt(newScore) || 0;
        }
        // Sort by score descending
        info.activeDynamic.scores.sort((a, b) => b.score - a.score);
        this._save();
    }

    // === PRODUCTS 86/85/PUSH ===
    addProduct(type, name, category) {
        // type: 'outOfStock86', 'lowStock85', 'push'
        // category: 'cocina' or 'meseros'
        const info = this.getDailyInfo();
        if (!info.products) info.products = { outOfStock86: [], lowStock85: [], push: [] };
        if (!info.products[type]) info.products[type] = [];
        info.products[type].push({
            id: type + '_' + Date.now(),
            name,
            category
        });
        this._save();
    }

    deleteProduct(type, index) {
        const info = this.getDailyInfo();
        if (info.products && info.products[type]) {
            info.products[type].splice(index, 1);
            this._save();
        }
    }

    togglePushProduct(itemId) {
        const info = this.getDailyInfo();
        if (!info.products) info.products = { outOfStock86: [], lowStock85: [], push: [] };
        if (!info.products.push) info.products.push = [];

        // Check if item is already in push list (by ID or custom ID)
        const existingIndex = info.products.push.findIndex(p => p.itemId === itemId);

        if (existingIndex !== -1) {
            // Remove it
            info.products.push.splice(existingIndex, 1);
        } else {
            // Find item in menu to get details
            let item = null;
            if (this.data.menu && this.data.menu.alimentos) item = this.data.menu.alimentos.find(i => i.id === itemId);
            if (!item && this.data.menu && this.data.menu.bebidas) item = this.data.menu.bebidas.find(i => i.id === itemId);

            if (item) {
                // Add it
                info.products.push.push({
                    id: 'push_' + Date.now(),
                    itemId: item.id,
                    name: item.name,
                    category: item.category || 'Otros'
                });
            }
        }
        this._save();
        return true;
    }

    // Legacy compatibility
    updateDailyPromos(promos) {
        // For backward compat - convert to new structure
        const info = this.getDailyInfo();
        info.promoCatalog = promos;
        info.activePromoIds = promos.map(p => p.id);
        this._save();
    }

    updateDailyDynamics(dynamicsData) {
        const info = this.getDailyInfo();
        if (dynamicsData && dynamicsData.active) {
            // Legacy format
            if (!info.dynamicCatalog) info.dynamicCatalog = [];
            const existing = info.dynamicCatalog.find(d => d.id === dynamicsData.active.id);
            if (!existing) {
                info.dynamicCatalog.push({
                    id: dynamicsData.active.id,
                    title: dynamicsData.active.title,
                    description: dynamicsData.active.description,
                    metric: dynamicsData.active.metric || 'count'
                });
            }
            info.activeDynamic = {
                catalogId: dynamicsData.active.id,
                date: new Date().toISOString().split('T')[0],
                scores: (dynamicsData.leaderboard || []).map(l => ({
                    odoo_id: l.waiterId,
                    waiterName: l.waiterName,
                    score: l.score || 0
                }))
            };
        } else {
            info.activeDynamic = null;
        }
        this._save();
    }

    updateProducts86(products) {
        // Legacy - maps to outOfStock86
        const info = this.getDailyInfo();
        if (!info.products) info.products = { outOfStock86: [], lowStock85: [], push: [] };
        info.products.outOfStock86 = products.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category === 'Platillos' || p.category === 'cocina' ? 'cocina' : 'meseros'
        }));
        this._save();
    }

    // === AI SUGGESTIONS (Personalized) ===
    generateAISuggestion(customerId) {
        const customer = this.data.customers.find(c => c.id === customerId);
        if (!customer) return 'Cliente nuevo - ofrecer menú completo.';

        const visits = this.data.visits.filter(v => v.customerId === customerId);
        const classification = this.getCustomerClassification(customerId);

        let suggestions = [];

        // Based on classification
        if (classification === 'Diamond' || classification === 'VIP') {
            suggestions.push('Cliente premium - ofrecer platillos especiales o promociones VIP');
        }

        // Based on visit frequency
        if (visits.length >= 5) {
            suggestions.push('Cliente frecuente');
        } else if (visits.length === 1) {
            suggestions.push('Segunda visita - impresionar para fidelizar');
        }

        // Based on top drinks
        if (customer.topDrinks && customer.topDrinks.length > 0) {
            const topDrink = customer.topDrinks[0];
            // Check if there's a promo for drinks
            const dailyInfo = this.getDailyInfo();
            const drinkPromo = dailyInfo.promos.find(p => p.title.toLowerCase().includes('cerveza') || p.title.toLowerCase().includes('bebida'));
            if (drinkPromo) {
                suggestions.push(`Ofrecer "${drinkPromo.title}" - cliente suele pedir ${topDrink} `);
            } else {
                suggestions.push(`Cliente prefiere ${topDrink} `);
            }
        }

        // Based on top food
        if (customer.topFood && customer.topFood.length > 0) {
            const topFood = customer.topFood[0];
            suggestions.push(`Suele pedir ${topFood} `);
        }

        // Based on team (if there's a game today)
        if (customer.team) {
            const dailyInfo = this.getDailyInfo();
            const game = dailyInfo.games.find(g =>
                g.homeTeam === customer.team || g.awayTeam === customer.team
            );
            if (game) {
                suggestions.push(`¡Su equipo juega hoy! ${game.homeTeam} vs ${game.awayTeam} a las ${game.time} `);
            }
        }

        // Default if no suggestions
        if (suggestions.length === 0) {
            return 'Nuevo cliente - ofrecer promociones del día y menú recomendado.';
        }

        return suggestions.join('. ');
    }

    // --- INVENTORY / ADMIN METHODS ---


    addNewProduct(name, category, price, type) {
        // type should be 'alimentos' or 'bebidas'
        if (!this.menu[type]) return false;

        const newId = (type === 'alimentos' ? 'A' : 'B') + Date.now().toString().slice(-4);

        const newItem = {
            id: newId,
            name: name,
            category: category,
            price: parseFloat(price) || 0,
            available: true
        };

        this.menu[type].push(newItem);
        this._save();
        return newItem;
    }

    addGame_DUPLICATE_DO_NOT_USE(gameData) {
        const info = this.getDailyInfo();
        const newGame = {
            id: 'g' + Date.now(),
            league: gameData.league || 'General',
            homeTeam: gameData.homeTeam,
            awayTeam: gameData.awayTeam,
            time: gameData.time,
            date: new Date().toISOString().split('T')[0]
        };
        info.games.push(newGame);
        this._save();

        // SYNC FIREBASE
        if (window.dbFirestore && window.FB) {
            const { doc, setDoc } = window.FB;
            setDoc(doc(window.dbFirestore, 'config', 'daily'), { games: info.games }, { merge: true })
                .catch(e => console.error('🔥 Sync add game error', e));
        }
        return newGame;
    }

    removeGame(gameId) {
        const info = this.getDailyInfo();
        const oldGames = info.games || [];
        const newGames = oldGames.filter(g => g.id !== gameId);

        // Use centralized updater (handles Firebase sync to allGames)
        this.updateDailyGames(newGames);
    }

    clearTodayGames() {
        const today = new Date().toLocaleDateString('en-CA');
        const info = this.getDailyInfo();
        const oldGames = info.games || [];
        const beforeCount = oldGames.length;

        // Keep only games NOT from today
        const newGames = oldGames.filter(g => g.date !== today);
        const afterCount = newGames.length;

        console.log(`🗑️ Cleared ${beforeCount - afterCount} games from ${today} `);

        // Use centralized updater (handles Firebase sync to allGames)
        this.updateDailyGames(newGames);
    }


    // === GAME REQUESTS ===



}


const db = new Store();
window.db = db; // Expose to global for ease
window.deleteReservation = (id) => {
    if (confirm('¿Seguro que deseas eliminar esta reservación permanentemente?')) {
        return db.deleteReservation(id);
    }
};
