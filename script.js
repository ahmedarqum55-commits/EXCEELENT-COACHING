// Initialize Local Storage Data
function initializeLocalStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify({}));
    }
    if (!localStorage.getItem('inquiries')) {
        localStorage.setItem('inquiries', JSON.stringify([]));
    }
    if (!localStorage.getItem('enrollments')) {
        localStorage.setItem('enrollments', JSON.stringify([]));
    }
}

// Course details data
const courseDetails = {
    'Commerce': {
        title: 'Commerce Course Details',
        description: 'Our Commerce program is designed to provide students with a comprehensive understanding of business and trade concepts. The course covers essential subjects that form the foundation of commerce education, with a focus on practical application and exam preparation.',
        subjects: [
            'Accountancy - Principles and practices of accounting',
            'Economics - Micro and macro economics concepts',
            'Business Studies - Business organization and management',
            'Statistics - Data analysis and interpretation',
            'Commercial Law - Business legal framework'
        ],
        duration: '6 months per term',
        classes: '5 days a week, 2 hours per day',
        materials: 'Study material, practice sheets, and mock tests provided',
        download: 'commerce_course_details.docx'
    },
    'Mathematics': {
        title: 'Mathematics Course Details',
        description: 'Our Mathematics program focuses on building strong conceptual understanding and problem-solving skills. We use innovative teaching methods to make mathematics interesting and accessible, with an emphasis on application-based learning.',
        subjects: [
            'Algebra - Equations, functions, and sequences',
            'Geometry - Shapes, theorems, and proofs',
            'Calculus - Differentiation and integration',
            'Statistics - Probability and data analysis',
            'Trigonometry - Angles and trigonometric functions'
        ],
        duration: '6 months per term',
        classes: '5 days a week, 2 hours per day',
        materials: 'Study material, practice problems, and revision tests provided',
        download: 'mathematics_course_details.docx'
    },
    'Languages': {
        title: 'Languages Course Details',
        description: 'Our Languages program is designed to enhance communication skills and language proficiency. We focus on all aspects of language learning including reading, writing, speaking, and comprehension, with an emphasis on practical communication skills.',
        subjects: [
            'English - Grammar, composition, and literature',
            'Urdu - Language skills and literature appreciation',
            'Arabic - Basic to intermediate language skills',
            'Communication Skills - Public speaking and presentation',
            'Comprehension - Reading and understanding texts'
        ],
        duration: '4 months per term',
        classes: '3 days a week, 2 hours per day',
        materials: 'Textbooks, workbooks, and audio-visual aids provided',
        download: 'languages_course_details.docx'
    }
};

// Branch details data
const branchDetails = {
    'Saddar': {
        address: '12 Education Road, Saddar, City',
        phone: '+92 300 1111111',
        email: 'saddar@excellentcoaching.pk',
        hours: 'Mon-Fri: 9:00 AM - 7:00 PM, Sat: 9:00 AM - 2:00 PM',
        facilities: ['Air-conditioned classrooms', 'Library', 'Computer lab', 'Parking facility']
    },
    'Gulberg': {
        address: '45 College Street, Gulberg',
        phone: '+92 300 2222222',
        email: 'gulberg@excellentcoaching.pk',
        hours: 'Mon-Fri: 9:00 AM - 7:00 PM, Sat: 9:00 AM - 2:00 PM',
        facilities: ['Air-conditioned classrooms', 'Science lab', 'Cafeteria', 'Parking facility']
    },
    'DHA': {
        address: 'Phase 4, Main Road, DHA',
        phone: '+92 300 3333333',
        email: 'dha@excellentcoaching.pk',
        hours: 'Mon-Fri: 9:00 AM - 7:00 PM, Sat: 9:00 AM - 2:00 PM',
        facilities: ['Air-conditioned classrooms', 'Auditorium', 'Sports facilities', 'Parking facility']
    }
};

// Auth Section Functionality
const authSection = document.getElementById('auth');
const authNavLinks = document.querySelectorAll('.auth-nav-link');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const switchTabLinks = document.querySelectorAll('.switch-tab');
const userInfo = document.querySelector('.user-info');
const userName = document.getElementById('userName');
const userAvatar = document.getElementById('userAvatar');
const logoutBtn = document.getElementById('logoutBtn');

// Initialize localStorage
initializeLocalStorage();

// Check if user is already logged in
checkUserLogin();

// Show auth section when auth nav links are clicked
authNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const tab = this.getAttribute('data-tab');
        showAuthSection(tab);
    });
});

// Switch tabs within auth section
authTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        switchAuthTab(tabName);
    });
});

// Switch tabs from form links
switchTabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const tab = this.getAttribute('data-tab');
        switchAuthTab(tab);
    });
});

// Logout functionality
logoutBtn.addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    checkUserLogin();
    showHomeSection();
    alert('You have been logged out successfully.');
});

// Function to check if user is logged in
function checkUserLogin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        // User is logged in
        userInfo.classList.add('active');
        userName.textContent = currentUser.name;
        userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
       
        // Hide login/signup links
        authNavLinks.forEach(link => {
            link.parentElement.style.display = 'none';
        });
    } else {
        // User is not logged in
        userInfo.classList.remove('active');
       
        // Show login/signup links
        authNavLinks.forEach(link => {
            link.parentElement.style.display = 'block';
        });
    }
}

// Function to show auth section and switch to specific tab
function showAuthSection(tab) {
    // Hide all sections except auth
    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'auth') {
            section.style.display = 'none';
        }
    });
   
    // Show auth section
    authSection.style.display = 'block';
   
    // Switch to specified tab
    switchAuthTab(tab);
   
    // Scroll to auth section
    authSection.scrollIntoView({ behavior: 'smooth' });
}

// Function to switch between login and signup tabs
function switchAuthTab(tabName) {
    // Update active tab
    authTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
   
    // Update active form
    authForms.forEach(form => {
        if (form.id === `${tabName}Form`) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
   
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
   
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
   
    // Check if user exists and password matches
    if (users[email] && users[email].password === password) {
        alert('Login successful!');
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            name: users[email].name
        }));
       
        // Update UI
        checkUserLogin();
       
        // Redirect to home
        showHomeSection();
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
   
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
   
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }
   
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
   
    // Check if user already exists
    if (users[email]) {
        alert('An account with this email already exists. Please login instead.');
        return;
    }
   
    // Save user data
    users[email] = {
        password: password,
        name: name,
        phone: phone,
        signupDate: new Date().toLocaleString()
    };
   
    localStorage.setItem('users', JSON.stringify(users));
   
    alert('Account created successfully! You can now login.');
    switchAuthTab('login');
});

// Handle inquiry form submission
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
   
    const name = document.getElementById('inquiryName').value;
    const email = document.getElementById('inquiryEmail').value;
    const phone = document.getElementById('inquiryPhone').value;
    const course = document.getElementById('inquiryCourse').value;
    const message = document.getElementById('inquiryMessage').value;
   
    // Create inquiry object
    const inquiry = {
        name: name,
        email: email,
        phone: phone,
        course: course,
        message: message,
        date: new Date().toLocaleString()
    };
   
    // Get existing inquiries from localStorage
    const inquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
   
    // Add new inquiry
    inquiries.push(inquiry);
   
    // Save back to localStorage
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
   
    alert('Thank you for your inquiry! We will contact you soon.');
    this.reset();
});

// Handle enroll form submission
document.getElementById('enrollForm').addEventListener('submit', function(e) {
    e.preventDefault();
   
    const name = document.getElementById('enrollName').value;
    const email = document.getElementById('enrollEmail').value;
    const phone = document.getElementById('enrollPhone').value;
    const course = document.getElementById('enrollCourseSelect').value;
    const branch = document.getElementById('enrollBranch').value;
   
    // Create enrollment object
    const enrollment = {
        name: name,
        email: email,
        phone: phone,
        course: course,
        branch: branch,
        date: new Date().toLocaleString(),
        status: 'Pending'
    };
   
    // Get existing enrollments from localStorage
    const enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
   
    // Add new enrollment
    enrollments.push(enrollment);
   
    // Save back to localStorage
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
   
    alert('Thank you for registering! We will contact you shortly to complete the enrollment process.');
    this.reset();
   
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('enrollModal'));
    modal.hide();
});

// Function to show home section and hide auth
function showHomeSection() {
    // Show all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'block';
    });
   
    // Hide auth section
    authSection.style.display = 'none';
   
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle course detail modal
const courseDetailModal = document.getElementById('courseDetailModal');
courseDetailModal.addEventListener('show.bs.modal', function(event) {
    const button = event.relatedTarget;
    const course = button.getAttribute('data-course');
    const modalTitle = courseDetailModal.querySelector('.modal-title');
    const modalBody = courseDetailModal.querySelector('#courseDetailContent');
   
    modalTitle.textContent = courseDetails[course].title;
   
    let content = `
        <h4>Course Description</h4>
        <p>${courseDetails[course].description}</p>
       
        <h5 class="mt-4">Subjects Covered</h5>
        <ul class="course-list">
    `;
   
    courseDetails[course].subjects.forEach(subject => {
        content += `<li><i class="fas fa-book"></i> ${subject}</li>`;
    });
   
    content += `
        </ul>
       
        <div class="row mt-4">
            <div class="col-md-6">
                <h5>Duration</h5>
                <p>${courseDetails[course].duration}</p>
            </div>
            <div class="col-md-6">
                <h5>Class Schedule</h5>
                <p>${courseDetails[course].classes}</p>
            </div>
        </div>
       
        <h5 class="mt-4">Study Materials</h5>
        <p>${courseDetails[course].materials}</p>
    `;
   
    modalBody.innerHTML = content;
});

// Handle branch detail modal
const branchModal = document.getElementById('branchModal');
branchModal.addEventListener('show.bs.modal', function(event) {
    const button = event.relatedTarget;
    const branch = button.getAttribute('data-branch');
    const modalTitle = branchModal.querySelector('.modal-title');
    const modalBody = branchModal.querySelector('#branchDetailContent');
   
    modalTitle.textContent = `${branch} Branch`;
   
    let content = `
        <p><strong>Address:</strong> ${branchDetails[branch].address}</p>
        <p><strong>Phone:</strong> ${branchDetails[branch].phone}</p>
        <p><strong>Email:</strong> ${branchDetails[branch].email}</p>
        <p><strong>Hours:</strong> ${branchDetails[branch].hours}</p>
       
        <h5 class="mt-4">Facilities</h5>
        <ul class="course-list">
    `;
   
    branchDetails[branch].facilities.forEach(facility => {
        content += `<li><i class="fas fa-check"></i> ${facility}</li>`;
    });
   
    content += `</ul>`;
   
    modalBody.innerHTML = content;
});

// Handle enroll modal course selection
const enrollModal = document.getElementById('enrollModal');
enrollModal.addEventListener('show.bs.modal', function(event) {
    const button = event.relatedTarget;
    if (button) {
        const course = button.getAttribute('data-course');
        document.getElementById('enrollCourseSelect').value = course;
    }
});