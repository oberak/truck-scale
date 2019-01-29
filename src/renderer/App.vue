<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <v-list>
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile>
          <v-list-group
            v-for="item in items"
            v-model="item.active"
            :key="item.title"
            :prepend-icon="item.icon"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              router
              :to="subItem.to"
              :key="i"
              v-for="(subItem, i) in item.items"
              exact
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon v-html="subItem.icon"></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn 
          icon
          @click.native.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        
       
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
      
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
     
      <v-footer :fixed="fixed" app>
        <v-spacer></v-spacer>
        <span>&copy; 2019</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'truck-scale',
    data: () => ({
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'local_shipping',
          title: 'Weighing',
          items: [
            { title: 'Initial Weighing', to: '/weighing/initial' },
            { title: 'Final Weighing', to: '/weighing/final' },
            { title: 'Single Weighing', to: '/weighing/single' },
          ],
        },
        {
          icon: 'assignment_turned_in',
          title: 'Tickets',
          items: [
            { title: 'Weighing Tickets', to: '/tickets/weighing' },
            { title: 'Completed Tickets', to: '/tickets/completed' },
          ],
        },
        {
          icon: 'assignment',
          title: 'Managements',
          items: [
            { title: 'Materials', to: '/manage/materials' },
            { title: 'Clients', to: '/manage/clients' },
            { title: 'Trucks', to: '/manage/trucks' },
            { title: 'Scales', to: '/manage/scales' },
          ],
        },
        {
          icon: 'list',
          title: 'Reports',
          items: [
            { title: 'by Period', to: '/report/period' },
            { title: 'by Client', to: '/report/client' },
            { title: 'by Material', to: '/report/material' },
            { title: 'Report Forms', to: '/report/forms' },
          ],
        },
        {
          icon: 'account_box',
          title: 'Authorizations',
          items: [
            { title: 'Accounts', to: '/users/accounts' },
            { title: 'Roles', to: '/users/roles' },
          ],
        },
        {
          icon: 'settings_applications',
          title: 'Setting',
          items: [
            { title: 'General', to: '/settings/general' },
            { title: 'Weighing', to: '/settings/weighing' },
            { title: 'Communications', to: '/settings/communications' },
            { title: 'Devices', to: '/settings/devices' },
          ],
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'DGJ Truck Scale',
    }),
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
