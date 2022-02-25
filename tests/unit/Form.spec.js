import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import Form from '@/components/Form.vue';

import Vuetify from "vuetify";

describe('App.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  })

  test('check if v-model works correctly', async () => {
    const wrapper = mount(Form, {vuetify});
    await wrapper.setData({name: 'Hello', phone: '89821233223'});
    expect(wrapper.find('input[name="userName"]').element.value).toBe('Hello');
    expect(wrapper.find('input[name="userPhone"]').element.value).toBe('89821233223');
  })

  test('check if Form reacts to click', async () => {
    const wrapper = mount(App, {vuetify});
    expect(wrapper.findComponent(Form).exists()).toBe(false);
    await wrapper.find('button').trigger('click');
    expect(wrapper.findComponent(Form).exists()).toBe(true);
    await wrapper.find('p.form__close').trigger('click');
    expect(wrapper.findComponent(Form).exists()).toBe(false);
  })

  test('check if Form resets', async () => {
    const wrapper = mount(Form, {vuetify});
    expect(wrapper.find('button.form__btn').exists()).toBeTruthy();
    await wrapper.setData({name: 'Hello', phone: '89821233223', parentId: null, localValue: []});
    const resetForm = jest.spyOn(wrapper.vm, 'resetForm');
    await wrapper.find('button.form__btn').trigger('click');
    expect(resetForm).toBeCalled();
  })

  test('check if user is being added', async () => {
    const wrapper = mount(Form, {vuetify});
    expect(wrapper.find('button.form__btn').exists()).toBeTruthy();
    await wrapper.setData({name: 'Hello', phone: '89821233223', parentId: null, localValue: []});
    const addUser = jest.spyOn(wrapper.vm, 'addUser');
    await wrapper.find('button.form__btn').trigger('click');
    expect(addUser).toBeCalled();
  })

})