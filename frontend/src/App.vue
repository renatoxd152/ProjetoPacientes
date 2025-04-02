<template>
  <div id="app">
    <h1>Patient Management System</h1>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Home</router-link>
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/create" class="nav-link">Create Patient</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/read" class="nav-link">Read Patients</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #54fc6d1f;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

h1 {
  color: #60a875;
  font-size: 2.5rem;
  font-weight: bold;
  padding: 10px;
  margin: 0;
}

nav {
  margin-bottom: 20px;
}

.navbar {
  border-bottom: 2px solid #42b983;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b983 !important;
}

.nav-link {
  color: #42b983 !important;
}

.nav-link:hover {
  color: #2c3e50 !important;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
  color: #4da1dd !important;
}
</style>