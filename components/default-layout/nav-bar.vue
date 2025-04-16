<template>
  <div>
    <!-- =========== Navbar Start =========== -->
    <header
      id="navbar"
      class="link-color fixed top-0 inset-x-0 flex items-center z-40 w-full lg:bg-transparent bg-white transition-all py-5"
      :class="(isSticky && 'nav-sticky') || headerClass"
    >
      <div class="container">
        <nav class="flex items-center">
          <!-- Navbar Brand Logo -->
          <NuxtLink to="/">
            <!-- <img src="~/assets/images/logo-dark.png" class="h-8 logo-dark" alt="Logo Dark" />
              <img src="~/assets/images/logo-light.png" class="h-8 logo-light" alt="Logo Light" /> -->
          </NuxtLink>

          <!-- Nevigation Menu -->
          <div class="hidden lg:block ms-auto">
            <ul class="navbar-nav flex gap-x-3 items-center justify-center">
              <!-- Home Page Link -->
              <li class="nav-item">
                <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              </li>

              <!-- Home Page Dropdown -->

              <li class="nav-item">
                <NuxtLink class="nav-link" to="/about">About</NuxtLink>
              </li>

              <li class="nav-item">
                <NuxtLink class="nav-link" to="/contact">Contact us</NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Download Button -->
          <div class="hidden lg:flex items-center ms-3">
            <NuxtLink
              to="/apply"
              target="_blank"
              class="bg-primary text-white px-4 py-2 rounded inline-flex items-center text-sm"
              >Apply</NuxtLink
            >
          </div>

          <!-- Moblie Menu Toggle Button (Offcanvas Button) -->
          <div class="lg:hidden flex items-center ms-auto px-2.5">
            <button
              type="button"
              data-fc-target="mobileMenu"
              data-hs-overlay="#mobileMenu"
            >
              <i class="fa-solid fa-bars text-2xl text-gray-500"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
    <!-- =========== Navbar End =========== -->

    <!-- =========== Mobile Menu Start (Offcanvas) =========== -->
    <div
      id="mobileMenu"
      class="hs-overlay hs-overlay-open:translate-x-0 hs-overlay-open:opacity-100 translate-x-full fixed top-0 end-0 transition-all duration-200 transform h-full w-full max-w-md z-[60] bg-white border-s hidden"
    >
      <div class="flex flex-col h-full divide-y-2 divide-gray-200">
        <!-- Mobile Menu Topbar Logo (Header) -->
        <div class="p-6 flex items-center justify-between">
          <NuxtLink to="/">
            <!-- <img src="~/assets/images/logo-dark.png" class="h-8" alt="Logo" /> -->
          </NuxtLink>

          <button data-hs-overlay="#mobileMenu" class="flex items-center px-2">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <!-- Mobile Menu Link List -->
        <div class="p-6 overflow-scroll h-full">
          <ul class="navbar-nav flex flex-col gap-2" data-fc-type="accordion">
            <!-- Home Page Link -->
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link">Home</NuxtLink>
            </li>

            <!-- Landing Page -->
            <li class="nav-item">
              <a
                href="javascript:void(0)"
                data-hs-collapse="#landing-collapse"
                class="hs-collapse-toggle nav-link"
              >
                Landing
                <i
                  class="fa-solid fa-angle-down ms-auto align-middle transition-all hs-collapse-open:rotate-180"
                ></i>
              </a>

              <ul
                id="landing-collapse"
                class="hs-collapse hidden overflow-hidden transition-[height] duration-300 space-y-2"
              >
                <li class="nav-item mt-2">
                  <NuxtLink class="nav-link" to="/landing/app">App</NuxtLink>
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/landing/saas"
                    >Saas Modern</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/landing/saas2"
                    >Saas Classic</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/landing/startup"
                    >Startup</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/landing/software"
                    >Software</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/landing/agency"
                    >Agency</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/landing/coworking"
                    >Coworking</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/landing/crypto"
                    >Crypto</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/landing/marketing"
                    >Marketing</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/landing/portfolio"
                    >Portfolio</NuxtLink
                  >
                </li>
              </ul>
            </li>

            <!-- Inner Page -->
            <li class="nav-item">
              <a
                href="javascript:void(0)"
                data-hs-collapse="#pages-collapse"
                class="hs-collapse-toggle nav-link"
              >
                Pages
                <i
                  class="fa-solid fa-angle-down ms-auto align-middle transition-all hs-collapse-open:rotate-180"
                ></i>
              </a>

              <ul
                id="pages-collapse"
                class="hs-collapse hidden overflow-hidden transition-[height] duration-300 space-y-2"
              >
                <li class="nav-item mt-2">
                  <NuxtLink class="nav-link" to="/pages/company"
                    >Company</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/pages/career"
                    >Career</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/pages/pricing"
                    >Pricing</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/pages/help">Help</NuxtLink>
                </li>
              </ul>
            </li>

            <!-- Blog Page -->
            <li class="nav-item">
              <a
                href="javascript:void(0)"
                data-hs-collapse="#blog-collapse"
                class="hs-collapse-toggle nav-link"
              >
                Blog Page
                <i
                  class="fa-solid fa-angle-down ms-auto align-middle transition-all hs-collapse-open:rotate-180"
                ></i>
              </a>

              <ul
                id="blog-collapse"
                class="hs-collapse hidden overflow-hidden transition-[height] duration-300 space-y-2"
              >
                <li class="nav-item mt-2">
                  <NuxtLink class="nav-link" to="/blog/blog">Blog</NuxtLink>
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/blog/blog-post"
                    >Blog Post</NuxtLink
                  >
                </li>
              </ul>
            </li>

            <!-- Portfolio Page -->
            <li class="nav-item">
              <a
                href="javascript:void(0)"
                data-hs-collapse="#portfolio-collapse"
                class="hs-collapse-toggle nav-link"
              >
                Portfolio
                <!-- <i class="fa-solid fa-angle-down ms-auto align-middle transition-all hs-collapse-open:rotate-180"></i> -->
              </a>

              <ul
                id="portfolio-collapse"
                class="hs-collapse hidden overflow-hidden transition-[height] duration-300 space-y-2"
              >
                <li class="nav-item mt-2">
                  <NuxtLink class="nav-link" to="/portfolio/grid"
                    >Portfolio Grid</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/portfolio/masonry"
                    >Portfolio Masonry</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/portfolio/item"
                    >Portfolio Item</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/pages/account-confirm"
                    >Confirm Account</NuxtLink
                  >
                </li>
              </ul>
            </li>

            <!-- Auth Page -->
            <li class="nav-item">
              <a
                href="javascript:void(0)"
                data-hs-collapse="#account-collapse"
                class="hs-collapse-toggle nav-link"
              >
                Account
                <!-- <i
                  class="fa-solid fa-angle-down ms-auto align-middle transition-all hs-collapse-open:rotate-180"
                ></i> -->
              </a>

              <ul
                id="account-collapse"
                class="hs-collapse hidden overflow-hidden transition-[height] duration-300 space-y-2"
              >
                <li class="nav-item mt-2">
                  <NuxtLink class="nav-link" to="/pages/account-login"
                    >Login</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/pages/account-signup"
                    >Sign Up</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/pages/account-forget-password"
                    >Forget Password</NuxtLink
                  >
                </li>

                <li class="nav-item">
                  <NuxtLink class="nav-link" to="/pages/account-confirm"
                    >Confirm Account</NuxtLink
                  >
                </li>
              </ul>
            </li>

            <!-- About Page Link -->
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/about">About</NuxtLink>
            </li>

            <li class="nav-item">
              <NuxtLink class="nav-link" to="/contact">Contact us</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Mobile Menu Download Button (Footer) -->
        <div class="p-6 flex items-center justify-center">
          <NuxtLink
            to="/apply"
            target="_blank"
            class="bg-primary text-white px-4 py-2 rounded inline-flex items-center text-sm"
            >Apply</NuxtLink
          >
        </div>
      </div>
    </div>
    <!-- =========== Mobile Menu End =========== -->
  </div>
</template>

<script lang="ts" setup>
defineProps({
  headerClass: {
    type: String,
    default: "header-light",
  },
});
const isSticky = ref(false);

onMounted(() => {
  window.addEventListener("scroll", (ev) => {
    ev.preventDefault();
    isSticky.value =
      document.body.scrollTop >= 75 || document.documentElement.scrollTop >= 75;
  });

  window.addEventListener("scroll", windowScroll);

  initTopnav();
});

onUnmounted(() => {
  window.removeEventListener("scroll", windowScroll);
});

function windowScroll() {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (
      document.body.scrollTop >= 75 ||
      document.documentElement.scrollTop >= 75
    ) {
      navbar.classList.add("nav-sticky");
    } else {
      navbar.classList.remove("nav-sticky");
    }
  }
}

function initTopnav() {
  // Menu Active
  const pageUrl = window.location.href.split(/[?#]/)[0];
  const navbarLinks = Array.from(
    document.querySelectorAll("#navbar .navbar-nav a")
  ) as HTMLAnchorElement[];

  navbarLinks.forEach((link) => {
    if (link.href === pageUrl) {
      link.classList.add("active");

      const parentMenu = link?.parentElement?.parentElement?.parentElement;
      if (parentMenu?.classList.contains("nav-item")) {
        const dropdownElement = parentMenu.querySelector(
          '[data-fc-type="dropdown"]'
        );
        dropdownElement?.classList.add("active");
      }

      const parentParentMenu =
        link?.parentElement?.parentElement?.parentElement?.parentElement
          ?.parentElement;
      if (parentParentMenu?.classList.contains("nav-item")) {
        const dropdownElement = parentParentMenu.querySelector(
          '[data-fc-type="dropdown"]'
        );
        dropdownElement?.classList.add("active");
      }
    }
  });
}
</script>
