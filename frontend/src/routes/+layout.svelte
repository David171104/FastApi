<!-- <script>
	import Footer from "$lib/components/Footer.svelte";
	import 	Navbar from "$lib/components/Navbar.svelte";
	import Swal from 'sweetalert2';
</script>

<Navbar></Navbar>


<slot></slot> -->

<script>
  import Footer from "$lib/components/Footer.svelte";
  import Navbar from '$lib/components/Navbar.svelte';
  import NavbarLoggedIn from '$lib/components/NavbarLoggedIn.svelte';
  import { isAuthenticated } from '$lib/stores/auth.js';
  import { onMount } from 'svelte';

  let loggedIn = false;
  let ready = false; // ✅ nueva variable

  $: loggedIn = $isAuthenticated;

  onMount(() => {
    const token = localStorage.getItem('token');
    if (token) isAuthenticated.set(true);
    ready = true; // ya revisamos localStorage
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

