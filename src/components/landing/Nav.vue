<template>
    <section id="menu-area">
        <nav class="navbar navbar-light  navbar-expand-md" role="navigation">
            <div class="container">
                <button type="button" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>&#x2630;
                </button>
                <router-link to="/" class="navbar-brand">
                    <img src="/assets/landing/images/logo_1.png" alt="Itender">
                </router-link>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul id="top-menu" class="nav navbar-nav ml-auto main-nav">
                        <li class="active nav-item">
                                <router-link to="/" class="nav-link">
                                 {{ $t('menu.home') }}
                                </router-link>
                        </li>
                        <li class="nav-item">
                                <router-link to="/tender" class="nav-link">
                                 {{ $t('menu.tenders') }}
                                </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/info" class="nav-link">
                                {{ $t('menu.information') }}
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/help" class="nav-link">
                                {{ $t('menu.help') }}
                            </router-link>
                        </li>
                        <!-- <li class="nav-item">
                            <a href="contact.html" class="nav-link">{{ $t('home.Կապ') }}</a>
                        </li> -->
                    </ul>
                </div>
            </div>
        </nav>
    </section>
</template>
