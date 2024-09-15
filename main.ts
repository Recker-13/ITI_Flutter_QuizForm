// Define the User type
interface User {
    id: number;
    age: number;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    is_verified: boolean;
    gender?: 'male' | 'female'; // Optional if gender may not be present
}

// Function to create user card dynamically
function createUserCard(user: User): string {
    const verifiedIcon = user.is_verified ? '🟢' : '🔴';
    return `
    <div class="user-card">
        <div class="profile-pic" style="background-image: url('${user.image}')"></div>
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>Gender: ${user.gender ? user.gender : 'N/A'}</p>
        <span class="verified-icon ${user.is_verified ? 'green' : 'red'}"></span>
    </div>
    `;
}

// Fetching users from users.json file
async function loadUsers(): Promise<User[]> {
    const response = await fetch('users.json');
    return await response.json() as User[];
}

// Display all users
async function displayUsers(users: User[]) {
    const usersContainer = document.getElementById('users-container');
    if (usersContainer) {
        usersContainer.innerHTML = users.map(user => createUserCard(user)).join('');
    }
}

// Handle search functionality
async function handleSearch() {
    const searchBar = document.getElementById('search-bar') as HTMLInputElement;
    const searchValue = searchBar.value.toLowerCase();
    const users = await loadUsers();

    const filteredUsers = users.filter(user => user.email.toLowerCase().includes(searchValue));
    await displayUsers(filteredUsers);

    document.getElementById('reset-button')!.style.display = 'inline';
}

// Reset search and display all users
async function handleReset() {
    const users = await loadUsers();
    await displayUsers(users);
    const searchBar = document.getElementById('search-bar') as HTMLInputElement;
    searchBar.value = '';
    document.getElementById('reset-button')!.style.display = 'none';
}

// Attach event listeners
window.onload = async () => {
    const users = await loadUsers();
    await displayUsers(users);

    document.getElementById('search-button')!.addEventListener('click', handleSearch);
    document.getElementById('reset-button')!.addEventListener('click', handleReset);
};
