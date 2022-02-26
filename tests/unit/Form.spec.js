import { mount } from '@vue/test-utils'
import Form from '@/components/Form.vue';

import Vuetify from "vuetify";

describe('App.vue', () => {
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    wrapper = mount(Form, {vuetify});
  })

  test('check if v-model works correctly', async () => {
    await wrapper.setData({name: 'Hello', phone: '89821233223'});
    expect(wrapper.find('input[name="userName"]').element.value).toBe('Hello');
    expect(wrapper.find('input[name="userPhone"]').element.value).toBe('89821233223');
  })

  test('check if Form resets', async () => {
    expect(wrapper.find('button.form__btn').exists()).toBeTruthy();
    await wrapper.setData({name: 'Hello', phone: '89821233223', parentId: null, localValue: []});
    const resetForm = jest.spyOn(wrapper.vm, 'resetForm');
    await wrapper.find('button.form__btn').trigger('click');
    expect(resetForm).toBeCalled();
  })

  test('check if user is being added', async () => {
    expect(wrapper.find('button.form__btn').exists()).toBeTruthy();
    await wrapper.setData({name: 'Hello', phone: '89821233223', parentId: null, localValue: []});
    const addUser = jest.spyOn(wrapper.vm, 'addUser');
    await wrapper.find('button.form__btn').trigger('click');
    expect(addUser).toBeCalled();
  })

  test('check if user is not being added', async () => {
    const wrapper = mount(Form, {vuetify});
    expect(wrapper.find('button.form__btn').exists()).toBeTruthy();
    const resetForm = jest.spyOn(wrapper.vm, 'resetForm');
    await wrapper.find('button.form__btn').trigger('click');
    expect(resetForm).not.toBeCalled();
  })

})