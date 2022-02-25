import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import Form from '@/components/Form.vue';

import Vuetify from "vuetify";


describe('App.vue', () => {
  let vuetify;

  let mockFridge = {}


  beforeAll(() => {
    global.Storage.prototype.setItem = jest.fn((key, value) => {
      mockFridge[key] = value
    })
    global.Storage.prototype.getItem = jest.fn((key) => mockFridge[key])
  })

  beforeEach(() => {
    mockFridge = {}
    vuetify = new Vuetify();
  })

  afterAll(() => {
    global.Storage.prototype.setItem.mockReset()
    global.Storage.prototype.getItem.mockReset()
  })

  test('components initial visible state', () => {
    const wrapper = mount(App, {vuetify});
    expect(wrapper.find('button').isVisible()).toBeTruthy();
    expect(wrapper.findComponent(Form).exists()).toBeFalsy();
    expect(wrapper.find('div.v-data-table').exists()).toBeFalsy();
  })

  test('if button disables', async () => {
    const wrapper = mount(App, {vuetify});
    expect(wrapper.find('button').classes()).not.toContain('v-btn--disabled');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('button').classes()).toContain('v-btn--disabled');
    await wrapper.find('p.form__close').trigger('click');
    expect(wrapper.find('button').classes()).not.toContain('v-btn--disabled');

  })

  test('if computed "ifUsersExist" works correctly', async () => {
    const wrapper = mount(App, {vuetify});
    expect(wrapper.vm.ifUsersExist).toBeFalsy();
    expect(wrapper.find('div.v-data-table').exists()).toBeFalsy();
    await wrapper.setData({users: [{name: 'Mike', phone: '123321'}]});
    expect(wrapper.vm.ifUsersExist).toBeTruthy();
    expect(wrapper.find('div.v-data-table').exists()).toBeTruthy();
  })

  test('if we get users from localStorage', () => {
    expect(global.Storage.prototype.getItem).toHaveBeenCalledWith('users')
  })

})
