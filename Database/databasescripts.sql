-- For products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    for_winter BOOLEAN DEFAULT FALSE,
    for_sun BOOLEAN DEFAULT FALSE,
    anti_age BOOLEAN DEFAULT FALSE,
    image_url TEXT
);

-- Insert values for products table
INSERT INTO products (id, name, description, for_winter, for_sun, anti_age, image_url)
VALUES
(1, 'Lait-Crème Concentré', 'The “must-have” 6-in-1 multi-function nourishing moisturizer', TRUE, TRUE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB202000_01.jpg?v=1718222285&width=1200'),
(2, 'Hydra Cream Energizing', 'A Vitamin-Infused Powerhouse for Radiant Skin', TRUE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/files/Hydra-Cream-Energizing-website2.jpg?v=1718140325&width=1200'),
(3, 'Hydra Serum', 'Active hydration for radiantly beautiful skin.', TRUE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB273000_01_b716e845-d2a9-4f2c-a9d2-ca6134378372.jpg?v=1685993543&width=1200'),
(4, '3-in-1 Paste', 'The ultimate in anti‑blemish skincare', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/files/3in1-secret-paste-embryolisse.jpg?v=1736159390&width=1200'),
(5, 'Cicalisse Hands and Nails', 'Nourishing repair cream with Shea Butter', TRUE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/files/new-cicalisse-hands-nails.jpg?v=1726167316&width=1200'),
(6, 'Filaderme Emulsion', 'This cream changes the life of dry and sensitive skin', TRUE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB305000_01_e509f3dc-801a-4dff-a481-9fc100e10430.jpg?v=1696974881&width=1200'),
(7, 'Exfoliating Milk Powder', 'The best of the coconut in a water-free powder', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/files/EB506000_03_f8acb2f6-7804-4e71-b11e-1bdb1e795a19.jpg?v=1736159860&width=600'),
(8, 'Foaming Cream Milk', 'The Foaming Cream-Milk has a rich and creamy nourishing texture', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB227000_01_b658107f-98f4-4910-864e-a3d74642bfc9.jpg?v=1685993500&width=1200'),
(9, 'Active Night Peeling', 'Gentle care with Lemon Caviar', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB108000_01_63b73009-827b-4240-9a8d-ea31555251a5.jpg?v=1689112065&width=1200'),
(10, 'Anti-Age Comfort Mark', 'This mask envelops the skin in a cocoon of softness, leaving a sensation of infinite well-being', FALSE, FALSE, TRUE, 'https://us.embryolisse.com/cdn/shop/products/EB104000_01_bfc5d228-ed63-420e-b79e-aa8c9dadd19f.jpg?v=1685993510&width=1200'),
(11, 'Firming-Lifting Cream', 'This velvety cream enriched in organic kangaroo paw flower plumps the skin daily for continuous correction of wrinkles and firmness', FALSE, FALSE, TRUE, 'https://us.embryolisse.com/cdn/shop/products/EB109000_01_8ee45d32-71b2-45e9-9c75-4055a0d19206.jpg?v=1689112565&width=1200'),
(12, 'Beauty Oil', 'Enriched with active plant oils, this dry oil protects and beautifies skin and hair', FALSE, FALSE, TRUE, 'https://us.embryolisse.com/cdn/shop/products/EB279000_01.jpg?v=1685612713&width=1200'),
(13, 'Lait-Crème Fluid+', 'Enhance your beauty routine with the New Lait-Crème Fluid+, where natural care meets exceptional performance', TRUE, TRUE, FALSE, 'https://us.embryolisse.com/cdn/shop/files/EB293000-Lait-Creme-Fluid_NEW_8548cdf0-d704-4cdf-9e04-106453105827.jpg?v=1710532579&width=1000'),
(14, 'Lait-Crème Sensitive', '7-in-1 multi-functional hydrating and nourishing moisturizer', TRUE, TRUE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB203000_01_32033547-8a63-45e7-8b33-a10b4a6e62f1.jpg?v=1685993556&width=1200'),
(15, 'Lait-Crème Retinol-Like', 'A skincare innovation with French Big Clover extract', TRUE, FALSE, TRUE, 'https://us.embryolisse.com/cdn/shop/files/LCR.jpg?v=1730129261&width=1200'),
(16, 'Winter Dry Skin Essentials', 'The Winter Dry Skin Essentials curated routine offers the ultimate solution for parched skin, providing hydration and relief for your face, lips, and hands', TRUE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/files/winter-routine.jpg?v=1728063014&width=1200'),
(17, 'Hydra Cream Light', 'Enriched in white nymphaea and a hyaluronic acid active complex, the Hydra-Cream Light replenishes the skin with water and delivers intense, long-lasting hydration', TRUE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB272000_01_f3e06faa-942a-4d0f-bc02-6dce4075cb35.jpg?v=1685993546&width=1200'),
(18, 'Smooth Active Cream', 'The Smooth-Active Cream is the ideal care for women with a busy lifestyle', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB603000_01_34616497-bcd5-45d5-b3c3-77c818664271.jpg?v=1685993582&width=1200'),
(19, 'Anti-Blemish Serum', 'The Anti-Blemish Serum is a powerful treatment that targets and diminishes 6 different types of skin imperfections: acne, redness, breakouts, blackheads, blemishes, and excess oil.', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/files/anti-blemish-serum-embryolisse-new-1200x1200_99d8409b-ea9f-4965-86a8-6954a8bd7f96.jpg?v=1736159527&width=1200'),
(20, 'Mattifying Moisturizer', 'Formulated with 98% natural ingredients, vegetable glycerin-enriched Mattifying Moisturizer is perfectly suited as a day—or night-time treatment after the Anti-Blemish Serum', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/files/mattifying-moisturizer-embryolisse.jpg?v=1736159660&width=1200'),
(21, 'Intense Moisturizing Mask', 'This gel mask, enriched with white nymphaea and hyaluronic acid, instantly replenishes the water reserves of even the thirstiest skin', TRUE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB290000_01_2016e882-bf0e-4ac1-8127-d097e1c4a891.jpg?v=1685993593&width=1200'),
(22, 'Protective & Nourishing Lip Balm', 'Moisturizes and nourishes, protects and soothes dry and damaged lips with active ingredients of natural origin', TRUE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/files/nourishing-lip-stick-embryolisse.webp?v=1734540558&width=700'),
(23, 'Cicalisse', 'Cicalisse Cream calms and restores the skin’s barrier function while moisturizing the damaged and weakened epidermis', TRUE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB303000_01_6ced751a-ae1a-4d13-9ac7-ef28f745374b.jpg?v=1689112053&width=1200'),
(24, 'Eau de Beaute Rosamelis', 'A refreshing toner, comprised of 4 organic beneficial floral waters, that can be used as a toner, a refreshing mist or a make-up fixing mist', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB501000_01_8e9423ca-c32b-4769-8d75-e5d9e9635f02.jpg?v=1689112400&width=1200'),
(25, 'Gentle Waterproof Make-up Remover Milk', 'This 4-in-1 milk cleanses, removes makeup, moisturizes, and soothes all skin types, even sensitive ones', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB504000_01_1dd480cb-005f-4d35-bf3c-835c98b7de11.jpg?v=1689112649&width=1200'),
(26, 'Micellar Lotion', 'A gentle and efficient micellar water that cleanses and removes makeup from the face, eyes, and lips', FALSE, FALSE, FALSE, 'https://us.embryolisse.com/cdn/shop/products/EB229000_01_94a77d4a-4be1-4dc0-8743-72bc1c56134f.jpg?v=1685993494&width=1200'),
(27, 'Smoothing Eye Contour Care', 'Genuine smoothing eye care, it acts simultaneously on dark circles, under-eye bags and fine lines for a rested, more youthful appearance after 28 days', FALSE, FALSE, TRUE, 'https://us.embryolisse.com/cdn/shop/products/EB106000_01_f74dd536-42f8-40e4-a28e-c890e27b032f.jpg?v=1696975029&width=1200');

-- For question: How would you describe your skin type?
CREATE TABLE skin_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO skin_types (name) VALUES
('Oily'),
('Dry'),
('Combination'),
('Normal'),
('Sensitive');

-- To combine the products with all the skin types it is used for

CREATE TABLE product_skin_types (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    skin_type_id INT REFERENCES skin_types(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, skin_type_id)
);


-- Insert values into product_skin_types
INSERT INTO product_skin_types (product_id, skin_type_id)
VALUES
-- Product 1: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(1, 2), (1, 1), (1, 5), (1, 4), (1, 3),

-- Product 2: dry (2), normal (4), sensitive (5)
(2, 2), (2, 4), (2, 5),

-- Product 3: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(3, 2), (3, 1), (3, 5), (3, 4), (3, 3),

-- Product 4: oily (1), combination (3)
(4, 1), (4, 3),

-- Product 5: dry (2)
(5, 2),

-- Product 6: dry (2), sensitive (5)
(6, 2), (6, 5),

-- Product 7: normal (4)
(7, 4),

-- Product 8: normal (4)
(8, 4),

-- Product 9: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(9, 2), (9, 1), (9, 5), (9, 4), (9, 3),

-- Product 10: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(10, 2), (10, 1), (10, 5), (10, 4), (10, 3),

-- Product 11: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(11, 2), (11, 1), (11, 5), (11, 4), (11, 3),

-- Product 12: dry (2), normal (4)
(12, 2), (12, 4),

-- Product 13: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(13, 2), (13, 1), (13, 5), (13, 4), (13, 3),

-- Product 14: sensitive (5)
(14, 5),

-- Product 15: dry (2), sensitive (5)
(15, 2), (15, 5),

-- Product 16: dry (2)
(16, 2),

-- Product 17: normal (4), combination (3)
(17, 4), (17, 3),

-- Product 18: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(18, 2), (18, 1), (18, 5), (18, 4), (18, 3),

-- Product 19: combination (3), oily (1)
(19, 3), (19, 1),

-- Product 20: combination (3), oily (1)
(20, 3), (20, 1),

-- Product 21: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(21, 2), (21, 1), (21, 5), (21, 4), (21, 3),

-- Product 22: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(22, 2), (22, 1), (22, 5), (22, 4), (22, 3),

-- Product 23: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(23, 2), (23, 1), (23, 5), (23, 4), (23, 3),

-- Product 24: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(24, 2), (24, 1), (24, 5), (24, 4), (24, 3),

-- Product 25: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(25, 2), (25, 1), (25, 5), (25, 4), (25, 3),

-- Product 26: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(26, 2), (26, 1), (26, 5), (26, 4), (26, 3),

-- Product 27: dry (2), oily (1), sensitive (5), normal (4), combination (3)
(27, 2), (27, 1), (27, 5), (27, 4), (27, 3);

--For question: What is your top skin concern?
CREATE TABLE concerns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO concerns (name) VALUES
('Acne'),
('Dark spots'),
('Redness'),
('Wrinkles'),
('Fine lines'),
('Dryness'),
('Oiliness'),
('Uneven texture');

-- To combine products with the skin concerns they treat
CREATE TABLE product_concerns (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    concern_id INT REFERENCES concerns(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, concern_id)
);

-- Insert values into product_concerns
INSERT INTO product_concerns (product_id, concern_id)
VALUES
-- Product 1: redness (3), dryness (6), oiliness (7)
(1, 3), (1, 6), (1, 7),

-- Product 2: dark spots (2), dryness (6), uneven texture (8)
(2, 2), (2, 6), (2, 8),

-- Product 3: dryness (6)
(3, 6),

-- Product 4: acne (1), oiliness (7), redness (3)
(4, 1), (4, 7), (4, 3),

-- Product 5: dryness (6)
(5, 6),

-- Product 6: dryness (6)
(6, 6),

-- Product 7: oiliness (7)
(7, 7),

-- Product 8: oiliness (7)
(8, 7),

-- Product 9: dark spots (2), uneven texture (8)
(9, 2), (9, 8),

-- Product 10: fine lines (5), wrinkles (4)
(10, 5), (10, 4),

-- Product 11: fine lines (5), wrinkles (4)
(11, 5), (11, 4),

-- Product 12: dryness (6), uneven texture (8)
(12, 6), (12, 8),

-- Product 13: redness (3), dryness (6), oiliness (7)
(13, 3), (13, 6), (13, 7),

-- Product 14: redness (3), dryness (6), oiliness (7)
(14, 3), (14, 6), (14, 7),

-- Product 15: fine lines (5), wrinkles (4), dryness (6)
(15, 5), (15, 4), (15, 6),

-- Product 16: dryness (6)
(16, 6),

-- Product 17: dryness (6)
(17, 6),

-- Product 18: dryness (6), redness (3)
(18, 6), (18, 3),

-- Product 19: acne (1), oiliness (7), redness (3)
(19, 1), (19, 7), (19, 3),

-- Product 20: acne (1), oiliness (7), uneven texture (8)
(20, 1), (20, 7), (20, 8),

-- Product 21: dryness (6)
(21, 6),

-- Product 22: dryness (6)
(22, 6),

-- Product 23: dryness (6)
(23, 6),

-- Product 24: uneven texture (8)
(24, 8),

-- Product 25: oiliness (7)
(25, 7),

-- Product 26: oiliness (7)
(26, 7),

-- Product 27: fine lines (5), wrinkles (4)
(27, 5), (27, 4);

-- For question: How often do you experience breakouts?

CREATE TABLE breakouts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO breakouts (name) VALUES
('Never'),
('Rarely'),
('Sometimes'),
('Frequently');

-- To combine products with whether they are used to treat acne
CREATE TABLE product_breakouts (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    breakout_id INT REFERENCES breakouts(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, breakout_id)
);

-- Insert values into product_breakouts
INSERT INTO product_breakouts (product_id, breakout_id)
VALUES
-- Product 1: never (1), rarely (2)
(1, 1), (1, 2),

-- Product 2: never (1), rarely (2)
(2, 1), (2, 2),

-- Product 3: never (1), rarely (2)
(3, 1), (3, 2),

-- Product 4: sometimes (3), frequently (4)
(4, 3), (4, 4),

-- Product 5: never (1), rarely (2)
(5, 1), (5, 2),

-- Product 6: never (1), rarely (2)
(6, 1), (6, 2),

-- Product 7: never (1), rarely (2)
(7, 1), (7, 2),

-- Product 8: never (1), rarely (2)
(8, 1), (8, 2),

-- Product 9: never (1), rarely (2)
(9, 1), (9, 2),

-- Product 10: never (1), rarely (2)
(10, 1), (10, 2),

-- Product 11: never (1), rarely (2)
(11, 1), (11, 2),

-- Product 12: never (1), rarely (2)
(12, 1), (12, 2),

-- Product 13: never (1), rarely (2)
(13, 1), (13, 2),

-- Product 14: never (1), rarely (2)
(14, 1), (14, 2),

-- Product 15: never (1), rarely (2)
(15, 1), (15, 2),

-- Product 16: never (1), rarely (2)
(16, 1), (16, 2),

-- Product 17: never (1), rarely (2)
(17, 1), (17, 2),

-- Product 18: never (1), rarely (2)
(18, 1), (18, 2),

-- Product 19: sometimes (3), frequently (4)
(19, 3), (19, 4),

-- Product 20: sometimes (3), frequently (4)
(20, 3), (20, 4),

-- Product 21: never (1), rarely (2)
(21, 1), (21, 2),

-- Product 22: never (1), rarely (2)
(22, 1), (22, 2),

-- Product 23: never (1), rarely (2)
(23, 1), (23, 2),

-- Product 24: never (1), rarely (2)
(24, 1), (24, 2),

-- Product 25: never (1), rarely (2)
(25, 1), (25, 2),

-- Product 26: never (1), rarely (2)
(26, 1), (26, 2),

-- Product 27: never (1), rarely (2)
(27, 1), (27, 2);

--For question: What areas would you like to target with our products?

CREATE TABLE target_areas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO target_areas (name) VALUES
('Hands'),
('Body'),
('Face'),
('Lips'),
('Eyes');

-- To combine products with the areas they target
CREATE TABLE product_target_areas (
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    target_area_id INT REFERENCES target_areas(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, target_area_id)
);

-- Insert values into product_target_areas
INSERT INTO product_target_areas (product_id, target_area_id)
VALUES
-- Product 1: face (3), body (2)
(1, 3), (1, 2),

-- Product 2: face (3), body (2)
(2, 3), (2, 2),

-- Product 3: face (3), body (2)
(3, 3), (3, 2),

-- Product 4: face (3)
(4, 3),

-- Product 5: hands (1)
(5, 1),

-- Product 6: face (3)
(6, 3),

-- Product 7: face (3)
(7, 3),

-- Product 8: face (3), body (2)
(8, 3), (8, 2),

-- Product 9: face (3), body (2)
(9, 3), (9, 2),

-- Product 10: face (3)
(10, 3),

-- Product 11: face (3)
(11, 3),

-- Product 12: face (3), body (2)
(12, 3), (12, 2),

-- Product 13: face (3), body (2)
(13, 3), (13, 2),

-- Product 14: face (3), body (2)
(14, 3), (14, 2),

-- Product 15: face (3), body (2)
(15, 3), (15, 2),

-- Product 16: face (3), lips (4), hands (1)
(16, 3), (16, 4), (16, 1),

-- Product 17: face (3), body (2)
(17, 3), (17, 2),

-- Product 18: face (3)
(18, 3),

-- Product 19: face (3), body (2)
(19, 3), (19, 2),

-- Product 20: face (3)
(20, 3),

-- Product 21: face (3)
(21, 3),

-- Product 22: lips (4)
(22, 4),

-- Product 23: face (3), body (2), lips (4)
(23, 3), (23, 2), (23, 4),

-- Product 24: face (3)
(24, 3),

-- Product 25: face (3), eyes (5), lips (4)
(25, 3), (25, 5), (25, 4),

-- Product 26: face (3), eyes (5), lips (4)
(26, 3), (26, 5), (26, 4),

-- Product 27: eyes (5)
(27, 5);


-- User and UserResponse tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT 
);

CREATE TABLE user_responses (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    skin_type_id INT REFERENCES skin_types(id) ON DELETE SET NULL,
    breakout_id INT REFERENCES breakouts(id) ON DELETE SET NULL,
    concern_id INT REFERENCES concerns(id) ON DELETE SET NULL,
    target_area_id INT REFERENCES target_areas(id) ON DELETE SET NULL,
    dry_in_winter BOOLEAN,
    spends_time_in_sun BOOLEAN
);

