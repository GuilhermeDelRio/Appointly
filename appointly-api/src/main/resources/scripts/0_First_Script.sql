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

    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,

    CONSTRAINT CHK_RELATIONSHIP_DEGREE CHECK (relationship_degree IN (
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

CREATE TABLE tb_appointment(
    id uuid NOT NULL PRIMARY KEY,
    initial_date TIMESTAMP NOT NULL,
    final_date TIMESTAMP NOT NULL,
    appointment_status VARCHAR(15) NOT NULL,
    id_patient uuid NOT NULL REFERENCES tb_patient(id),

    created_date TIMESTAMP,
    last_modified_date TIMESTAMP,

    CONSTRAINT CHK_APPOINTMENT_STATUS CHECK (appointment_status IN (
        'CANCELED',
        'COMPLETED',
        'CONFIRMED',
        'NO_SHOW',
        'PENDING',
        'RESCHEDULED',
        'SCHEDULED'
    ))
);

CREATE TABLE tb_systeminfo(
    id uuid NOT NULL PRIMARY KEY,
    appointment_duration INTEGER
);
