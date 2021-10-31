create database demo1;

create TABLE users(
  roll_no VARCHAR(255) PRIMARY KEY  ,
  user_name VARCHAR(255) NOT NULL,
  email_id VARCHAR(255) NOT NULL,
  pass_word VARCHAR(255) NOT NULL
 
);

INSERT  INTO users VALUES('1814127','RAVI','RAVI@GCT.AC.IN','RAVI@GCT');