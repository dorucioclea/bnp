module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.createTable('CatalogUser', {
        loginName: {
          field: 'LoginName',
          type: Sequelize.STRING(100),
          primaryKey: true,
          validate: {
            notEmpty: true
          }
        },
        password: {
          field: 'Password',
          type: Sequelize.STRING(32),
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        passwordChangedOn: {
          field: 'PasswordChangedOn',
          type: Sequelize.DATE
        },
        passwordReminder: {
          field: 'PasswordReminder',
          type: Sequelize.STRING(100)
        },
        passwordQuestion: {
          field: 'PasswordQuestion',
          type: Sequelize.STRING(100)
        },
        passwordAnswer: {
          field: 'PasswordAnswer',
          type: Sequelize.STRING(100)
        },
        firstName: {
          field: 'FirstName',
          type: Sequelize.STRING(50)
        },
        surname: {
          field: 'Surname',
          type: Sequelize.STRING(50)
        },
        salutation: {
          field: 'Salutation',
          type: Sequelize.STRING(20)
        },
        degree: {
          field: 'Degree',
          type: Sequelize.STRING(20)
        },
        phoneNo: {
          field: 'PhoneNo',
          type: Sequelize.STRING(20)
        },
        faxNo: {
          field: 'FaxNo',
          type: Sequelize.STRING(20)
        },
        email: {
          field: 'EMail',
          type: Sequelize.STRING(100)
        },
        birthday: {
          field: 'Birthday',
          type: Sequelize.DATE
        },
        isInfoServer: {
          field: 'IsInfoServer',
          type: Sequelize.BOOLEAN
        },
        homepage: {
          field: 'Homepage',
          type: Sequelize.STRING(500)
        },
        lastLogin: {
          field: 'LastLogin',
          type: Sequelize.DATE
        },
        numberOfFailedLogins: {
          field: 'NumberOfFailedLogins',
          type: Sequelize.INTEGER
        },
        numberOfFailedAnswers: {
          field: 'NumberOfFailedAnswers',
          type: Sequelize.INTEGER
        },
        locked: {
          field: 'Locked',
          type: Sequelize.BOOLEAN
        },
        receivingPerson: {
          field: 'ReceivingPerson',
          type: Sequelize.STRING(100)
        },
        department: {
          field: 'Department',
          type: Sequelize.STRING(40)
        },
        building: {
          field: 'Building',
          type: Sequelize.STRING(40)
        },
        floor: {
          field: 'Floor',
          type: Sequelize.STRING(40)
        },
        room: {
          field: 'Room',
          type: Sequelize.STRING(40)
        },
        mayChangeSupplier: {
          field: 'MayChangeSupplier',
          type: Sequelize.BOOLEAN
        },
        mayChangeCustomer: {
          field: 'MayChangeCustomer',
          type: Sequelize.BOOLEAN
        },
        showWelcomePage: {
          field: 'ShowWelcomePage',
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        verificationToken: {
          field: 'VerificationToken',
          type: Sequelize.STRING()
        },
        createdBy: {
          field: 'CreatedBy',
          type: Sequelize.STRING(60),
          allowNull: false
        },
        changedBy: {
          field: 'ChangedBy',
          type: Sequelize.STRING(60),
          allowNull: false
        },
        createdOn: {
          field: "CreatedOn",
          type: Sequelize.DATE,
          allowNull: false
        },
        changedOn: {
          field: "ChangedOn",
          type: Sequelize.DATE,
          allowNull: false
        }
      })
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('CatalogUser')
    ]);
  }
};
