<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />

  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
</svelte:head>

<script>
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from '$lib/components/Navbar.svelte';
  import NavbarLoggedIn from '$lib/components/NavbarLoggedIn.svelte';
  import { isAuthenticated } from '$lib/stores/auth.js';
  import { onMount } from 'svelte';

  let loggedIn = false;
  let ready = false; 

  $: loggedIn = $isAuthenticated;

  onMount(() => {
    const token = localStorage.getItem('token');
    if (token) isAuthenticated.set(true);
    ready = true; 
  });
</script>

{#if ready}
  {#if loggedIn}
    <NavbarLoggedIn />
  {:else}
    <Navbar />
  {/if}
{/if}

<slot></slot>
<Footer />

