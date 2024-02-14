CREATE TABLE Users (
    UserID          SERIAL,
    Username        VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash    VARCHAR(255) NOT NULL,
    Email           VARCHAR(255) UNIQUE,
    PRIMARY KEY (UserID)
);

CREATE TABLE Profiles (
    ProfileID   SERIAL,
    UserID      INTEGER,
    FirstName   VARCHAR(100),
    LastName    VARCHAR(100),
    Occupation  VARCHAR(100),
    About       TEXT,
    Contact     VARCHAR(255),
    PRIMARY KEY (ProfileID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Contact (
    ContactID           SERIAL,
    ProfileID           INTEGER,
    Email               VARCHAR(255),
    PhoneNumber         VARCHAR(30),
    LinkedInProfile     VARCHAR(255),
    Website             VARCHAR(500),
    PRIMARY KEY (ContactID),
    FOREIGN KEY (ProfileID) REFERENCES Profiles(ProfileID)
);

CREATE TABLE Education (
    EducationID     SERIAL,
    ProfileID       INTEGER,
    Institution     VARCHAR(255) NOT NULL,
    Degree          VARCHAR(100),
    FieldOfStudy    VARCHAR(100),
    StartDate       DATE NOT NULL,
    EndDate         DATE,
    PRIMARY KEY (EducationID),
    FOREIGN KEY (ProfileID) REFERENCES Profiles(ProfileID)
);

CREATE TABLE Experience (
    ExperienceID    SERIAL,
    ProfileID       INTEGER,
    Company         VARCHAR(255) NOT NULL,
    Position        VARCHAR(100) NOT NULL,
    StartDate       DATE NOT NULL,
    EndDate         DATE,
    Details         TEXT,
    PRIMARY KEY (ExperienceID),
    FOREIGN KEY (ProfileID) REFERENCES Profiles(ProfileID)
);

CREATE TABLE Licenses (
    LicenseID       SERIAL,
    ProfileID       INTEGER,
    LicenseName     VARCHAR(255) NOT NULL,
    IssuedBy        VARCHAR(255),
    IssueDate       DATE NOT NULL,
    ExpiryDate      DATE,
    PRIMARY KEY (LicenseID),
    FOREIGN KEY (ProfileID) REFERENCES Profiles(ProfileID)
);

CREATE TABLE Projects (
    ProjectID       SERIAL,
    ProfileID       INTEGER,
    ProjectName     VARCHAR(255) NOT NULL,
    Details         TEXT,
    StartDate       DATE NOT NULL,
    EndDate         DATE,
    ProjectURL      VARCHAR(255),
    PRIMARY KEY (ProjectID),
    FOREIGN KEY (ProfileID) REFERENCES Profiles(ProfileID)
);

CREATE TABLE Skills (
    SkillID             SERIAL,
    ProfileID           INTEGER,
    SkillName           VARCHAR(100) NOT NULL,
    ProficiencyLevel    VARCHAR(50),
    PRIMARY KEY (SkillID),
    FOREIGN KEY (ProfileID) REFERENCES Profiles(ProfileID)
);

CREATE TABLE JobPostings (
    JobID                   SERIAL,
    PostedByUserID          INTEGER,
    JobTitle                VARCHAR(255) NOT NULL,
    JobDescription          TEXT NOT NULL,
    Requirements            TEXT NOT NULL,
    PostedDate              DATE NOT NULL,
    ApplicationDeadline     DATE NOT NULL,
    CompanyName             VARCHAR(100) NOT NULL,
    Location                VARCHAR(100) NOT NULL,
    SalaryRange             VARCHAR(100) NOT NULL,
    Category                VARCHAR(30) CHECK (Category IN ('Software Development', 'Design & UI/UX', 'Data Analysis & Science', 'IT & Networking','Other')),
    PRIMARY KEY (JobID),
    FOREIGN KEY (PostedByUserID) REFERENCES Profiles(ProfileID)
);
