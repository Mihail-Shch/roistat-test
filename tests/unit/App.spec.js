import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import Form from '@/components/Form.vue';

import Vuetify from "vuetify";


describe('App.vue', () => {
  let vuetify;
  let wrapper;


  const fakeLocalStorage = (function() {
    let store = {};
  
    return {
      getItem: function(key) {
        return store[key] || null;
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      removeItem: function(key) {
        delete store[key];
      },
      clear: function() {
        store = {};
      }
    };
  })();


  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage
    });
  })

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(App, {vuetify});
  })

  afterEach(() => {
    window.localStorage.clear();
  })

  test('components initial visible state', () => {
    expect(wrapper.find('button').isVisible()).toBeTruthy();
    expect(wrapper.findComponent(Form).exists()).toBeFalsy();
    expect(wrapper.find('div.v-data-table').exists()).toBeFalsy();
  })

  test('check if Form reacts to click', async () => {
    expect(wrapper.findComponent(Form).exists()).toBe(false);
    await wrapper.find('button').trigger('click');
    expect(wrapper.findComponent(Form).exists()).toBe(true);
    await wrapper.find('p.form__close').trigger('click');
    expect(wrapper.findComponent(Form).exists()).toBe(false);
  })

  test('if button disables', async () => {
    expect(wrapper.find('button').classes()).not.toContain('v-btn--disabled');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('button').classes()).toContain('v-btn--disabled');
    await wrapper.find('p.form__close').trigger('click');
    expect(wrapper.find('button').classes()).not.toContain('v-btn--disabled');

  })

  test('if computed "ifUsersExist" works correctly', async () => {
    expect(wrapper.vm.ifUsersExist).toBeFalsy();
    expect(wrapper.find('div.v-data-table').exists()).toBeFalsy();
    await wrapper.setData({users: [{name: 'Mike', phone: '123321'}]});
    expect(wrapper.vm.ifUsersExist).toBeTruthy();
    expect(wrapper.find('div.v-data-table').exists()).toBeTruthy();
  })

  test('if we get users from localStorage', () => {
    window.localStorage.setItem('users', '[{"name":"Pasha","phone":"8-982-12","id":"89efbc34b939b","parentId":null},{"name":"Lol","phone":"81221-121","id":"288ad0496c1e3","parentId":null}]');
    wrapper = mount(App, {vuetify});
    expect(JSON.parse(window.localStorage.getItem('users'))).toEqual(wrapper.vm.users);
  })

  test('if localStorage is invalid', () => {
    window.localStorage.setItem('users', '{Hello');
    wrapper = mount(App, {vuetify});
    expect(wrapper.vm.users).toEqual([]);
  })

})
