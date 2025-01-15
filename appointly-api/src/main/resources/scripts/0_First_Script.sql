CREATE TABLE tb_patient(
    id uuid NOT NULL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    phone_number VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    special_patient BOOLEAN NOT NULL,
    underage BOOLEAN NOT NULL,

    responsible_name VARCHAR(25),
    responsible_email VARCHAR(50),
    relationship_degree VARCHAR(30),
    responsible_phone_number VARCHAR(25),

    created_date timestamp,
    last_modified_date timestamp,

    CONSTRAINT CHK_RELATIONSHIP_DEGREE CHECK (relationship_degree in (
        'PARENT',
        'CHILD',
        'SIBLING',
        'SPOUSE',
        'GRANDPARENT',
        'GRANDCHILD',
        'AUNT_UNCLE',
        'NIECE_NEPHEW',
        'COUSIN'
    ))
);