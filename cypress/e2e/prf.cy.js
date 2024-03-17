/* eslint-disable no-undef */

describe('PRF Test Cases', () => {
  beforeEach(() => {
   cy.loginWithSSO(Cypress.env('username'), Cypress.env('password'));   
   cy.visit(Cypress.env('BASE_URL'));
    if(cy.get('.btn-google')){
      cy.get('.btn-google').click();
    }
    cy.wait(150)
  });


  
 
  it('should create PRF ', () => {
    // Fill in Client Details
    cy.get('#create-prf-button').click({ force: true });
     cy.wait(5000);

    cy.get('input[name="requestedBy"]').type('Anam Adil', { force: true });
    cy.get('select[name="client"]').select('Telus', { force: true });
    cy.get('input[name="projectName"]').type('Anam Adil', { force: true });
    cy.get('input[name="interviewerName"]').type('Telus', { force: true });
    cy.get('input[name="interviewTitle"]').type('Anam Adil', { force: true });
    cy.get('select[name="hiringManager"]').select('Talha Gillani', { force: true });
    cy.get('input[name="hubspotid"]').type('3', { force: true });
    cy.get('select[name="typesOfEngagement"]').select('fixed_price_project', { force: true });

    // // Fill in Position Detail
    cy.get('input[name="jobTitle"]').type('QA Engineer', { force: true });
    cy.get('select[name="seniorityLevel"]').select('Junior (0 to 2 years)', { force: true });
    cy.get('input[name="numOfOpenings"]').type('4', { force: true });
    cy.get('select[name="typeOfOpening"]').select('NEW', { force: true });

    // // Select interview date
    cy.get('.react-datepicker__input-container > input[name="targetInterviewDate"]').click({ force: true });
    cy.wait(2000); // Adjust the wait time as needed
    cy.get('.react-datepicker__day--018').click({ force: true, multiple: true });


    // // Fill in Employment Details
    cy.get('select[name="typeOfEmployment"]').select('Full-Time', { force: true });
    cy.get('.react-datepicker__input-container > input[name="targetStartDate"]').click({ force: true });
    cy.get('.react-datepicker__day--019').click({ force: true, multiple: true });
    cy.get('input[name="city"]').type('Lahore', { force: true });
    

    cy.get('input[name="country"]').type('Pakistan', { force: true });
    cy.get('select[name="candidateLocation"]').select('Offshore', { force: true });
    cy.get('select[name="workSetting"]').select('Remote', { force: true });
    cy.get('select[name="priority"]').select('Medium', { force: true });
    cy.get('input[name="billRate"]').type('15', { force: true });
    cy.get('select[name="department"]').select('Design', { force: true });

    // // Fill in project details
    cy.get('.editorHolder h3', { force: true, timeout: 10000 }).contains('Project Details').then(($heading) => { 
      const parentSection = $heading.parents('.editorHolder');
      cy.get(parentSection).find('div.ql-editor > p').type('Project Details Testing by Anam', { force: true }); // Example of typing text within the section
    });

    cy.get('.editorHolder h3', { force: true, timeout: 10000 }).contains('The Role').then(($heading) => { 
      const parentSection = $heading.parents('.editorHolder');
      cy.get(parentSection).find('div.ql-editor > p').type('The Role Testing', { force: true }); // Example of typing text within the section
    });

    cy.get('.editorHolder h3', { force: true, timeout: 10000 }).contains('You will').then(($heading) => { 
      const parentSection = $heading.parents('.editorHolder');
      cy.get(parentSection).find('div.ql-editor > p').type('You will Testing by Anam', { force: true }); // Example of typing text within the section
    });
   
    cy.get('.editorHolder h3', { force: true, timeout: 10000 }).contains('Who You Are').then(($heading) => { 
      const parentSection = $heading.parents('.editorHolder');
      cy.get(parentSection).find('div.ql-editor > p').type('Who You Are Testing by Anam', { force: true }); // Example of typing text within the section
    });
    // Submit PRF
    cy.get('#submit-prf-button').click({ force: true });
    cy.get('textarea[name="content"]').type("Automation Testing script comments By Anam", { force: true });
    cy.get('#submit-prf-button1').click({ force: true });
    cy.wait(10000);
  
    // /* Verify PRF status */
    cy.get('tbody > tr > td > span').eq(0).should('have.text', 'Initiated');

  })
   it('should rejected the PRF', () => {
    /* Reject PRF */

    cy.get('tbody > tr > td .bg-primary').eq(0).click({force: true})
    cy.get('button > span').eq(3).contains('Reject').click({ force: true });
    cy.wait(1000);
    cy.get('textarea[name="content"]').type("PRF rejected by Anam", { force: true });
    cy.get('.btn-primary[type="submit"]').contains('Reject PRF').click({ force: true });
    cy.wait(2000);


    cy.get('tbody > tr > td > span').eq(0).should('have.text', 'Rejected');

   })

   it('should Edit the PRF before resubmit', () => {
    // /* Edit PRF by own */
    cy.get('tbody > tr > td .bg-danger').eq(0).click({force: true})

    cy.get('button > span').eq(5).contains('Edit').click({ force: true });
    cy.wait(1000);
    cy.get('input[name="requestedBy"]').type('Anam Adil', { force: true });
    cy.get('button > span').eq(3).contains('Re Submit PRF').click({force: true})
    cy.get('textarea[name="content"]').type("PRF resubmitted by Anam after edited", { force: true });
    cy.get('.btn-primary[type="submit"]').contains('Re Submit PRF').click({ force: true });
    cy.wait(2000);

    /* verify status Initiated after edited */

    cy.get('tbody > tr > td > span').eq(0).should('have.text', 'Initiated');

   })
   it('should Forward the PRF after resubmit', () => {
    // /* Forward again after edit PRF by own */
    cy.wait(5000)
    cy.get('tbody > tr').eq(0).click({ force: true });
    cy.get('button > span').eq(5).contains('Forward').click({ force: true });
    cy.wait(1000);
    cy.get('textarea[name="content"]').type("PRF forwarded by Anam", { force: true });
    cy.get('.btn-primary[type="submit"]').contains('Forward PRF').click({ force: true });
    cy.wait(2000);
 
   })
   it('should Accept the PRF after resubmit', () => {
    cy.wait(5000)
    // /* Accept After Forward */

    cy.get('tbody > tr').eq(0).click({ force: true });
    cy.get('button > span').eq(5).contains('Accept PRF').click({ force: true });
    cy.wait(1000);
    cy.get('textarea[name="content"]').type("PRF accepted by Anam", { force: true });
    cy.get('.btn-primary[type="submit"]').contains('Accept PRF').click({ force: true });
    cy.wait(2000);

    /* verify status accepted */

    cy.get('tbody > tr > td > span').eq(0).should('have.text', 'Accepted');
   })

  //  it('should Closure the PRF after resubmit', () => {

   
  //   // it('should download logs', () => {
  //   //   cy.get('#logs-download-button').click({ force: true });
  //   //   cy.get('#excelSheet-download-button').click({ force: true });
  //   //   });



  // //  // --------------------------------- Uncomment if you want close PRF ------------
  //   /* request colsure  */

  //   cy.wait(1000);
  //   cy.get('tbody > tr').eq(0).click({ force: true });
  //   cy.get('button > span').eq(5).contains('Request Closure').click({ force: true });
  //   cy.get('textarea[name="content"]').type("PRF Request Closure by Anam", { force: true });
  //   cy.get('.btn-danger[type="submit"]').contains('Request Closure').click({ force: true });
   
  //   /* Accept Colosure */

  // //   cy.wait(1000);
  // //   cy.get('tbody > tr').eq(0).click({ force: true });
  // //   cy.get('.prf-btn').click({ force: true });
  // //   cy.wait(1000)

  // //   /* verify status is it closed now */

  // //   cy.get('tbody > tr > td > span').eq(0).should('have.text', 'Closed');


  //   // ---------------------------------  Uncomment -----------------------

  //   // /* My Profile Section */

  //   // cy.get('.dropdown-toggle').click({force: true})
  //   // cy.get('button > span').eq(0).contains('My Profile').click({force: true})
  //   // cy.get('div[name="resourceAvailable"] > span > input').check({force: true}) // Check first radio element
  //   // cy.get('div[name="resourceType"] > span > input').check({force: true}) // Check first radio element
  //   // cy.get('input[name="prefix"]').type('MS.Anam', { force: true });
  //   // cy.get('input[name="firstName"]').type('Anam', { force: true });
  //   // cy.get('input[name="lastName"]').type('Adil', { force: true });
  //   // cy.get('input[name="email"]').type('anam.adil@mobilelive.ca', { force: true });
  //   // cy.get('input[name="address"]').type('Alberta', { force: true });
  //   // cy.get('input[name="location"]').type('Alberta', { force: true });
  //   // cy.get('input[name="city"]').type('toronto', { force: true });
  //   // cy.get('input[name="zipCode"]').type('123', { force: true });
  //   // cy.get('input[name="state"]').type('Alberta', { force: true });
  //   // cy.get('.react-tel-input > input').type('+16478953988', { force: true });
  //   // cy.get('input[name="workAuth"]').type('Mobilelive', { force: true });
  //   // cy.get('input[name="yearsExperience"]').type('2', { force: true });
  //   // cy.get('input[name="jobTitle"]').type('QA', { force: true });
  //   // cy.get('input[name="languages.0.language"]').type('English', { force: true });
  //   // cy.get('select[name="languages.0.languageFluency"]').select('Very Proficient', { force: true });
  //   // cy.get('input[name="academics.0.school"]').type('LCWU', { force: true });
  //   // cy.get('input[name="academics.0.degree"]').type('BSCS', { force: true });
  //   // cy.get('.react-datepicker__input-container > input[name="academics.0.startDate"]').click({ force: true });
  //   // cy.get('.react-datepicker__day--026').click({ force: true });

  //   // download use case for annual, quarterly and monthly reports

  //   // cy.get('button > span').contains('Download Logs').click({ force: true });

  //   // cy.get('button > span').contains('Downloads Logs').click({ force: true });


  //   // cy.get('button > span').eq(5).contains('Quarterly').click({ force: true });

  //   // cy.get('button > span').eq(5).contains('Annually').click({ force: true });




  // });

 it('should initiate the close request', () => {
     /* Accept Colosure */

    cy.wait(5000);
    cy.get('tbody > tr').eq(0).click({ force: true });
    cy.wait(2000);
    cy.get('#button-closure').click({ force: true });
     cy.wait(1000)
     cy.get('textarea[name="content"]').type("PRF Request Closure by Anam", { force: true });
     cy.get('.btn-danger[type="submit"]').contains('Request Closure').click({ force: true });
     cy.wait(1000)


    /* verify status is it closed now */

    cy.get('tbody > tr > td > span').eq(0).should('have.text', 'Accepted');

 
 })

 it('should close the request and update the tag', () => {
      cy.wait(5000);
    cy.get('tbody > tr').eq(0).click({ force: true });

    cy.get('#closeprf-btn').click({ force: true });
    cy.wait(1000)

    /* verify status is it closed now */

    cy.get('tbody > tr > td > span').eq(0).should('have.text', 'Closed');

})

// it('should open RMS', () => {
// cy.wait(1000);
// cy.get('ul > li > a').eq(2).click({ force: true });
// cy.get('#button-manual-details').click({force: true});
// cy.get('input[name="firstName"]').type('Anam');
// cy.get('input[name="lastName"]').type('Adil');
// cy.get('input[name="email"]').type('test@example.com');
// cy.get('input[name="phone"]').type('1234567890');
// cy.get('input[name="jobTitle"]').type('YourJobTitle');
// cy.get('input[name="location"]').type('YourLocation');

// // Add skills
// cy.get('input[placeholder="Enter Skills"]').type('Skill1');
// cy.get('#resume-skill-add').click({ force: true });

// // Add experiences
// cy.get('input[placeholder="Enter Experiences"]').type('Experience1');
// cy.get('input[placeholder="Enter Duration"]').type('2 years');
// cy.get('input[placeholder="Enter Location"]').type('ExperienceLocation');
// cy.get('input[placeholder="Enter Summary"]').type('ExperienceSummary');
// cy.get('#resume-experience-add').click({ force: true });

// // Add education
// cy.get('input[placeholder="Enter Education"]').type('Education1');
// cy.get('input[placeholder="Enter Duration"]').eq(1).type('4 years');
// cy.get('input[placeholder="Enter Institution"]').eq(1).type('EducationInstitution');
// cy.get('#resume-education-add').click({ force: true });

// // Add certifications
// cy.get('input[placeholder="Enter Certfications"]').type('Certification1');
// cy.get('#resume-certification-add').click({ force: true });

// // Submit the form
// cy.get('button[type="submit"]').click({ force: true });


// })
 
});
