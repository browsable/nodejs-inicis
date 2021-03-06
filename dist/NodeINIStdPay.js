/**
 * Created by GwonHyeok on 2016. 12. 5..
 * Edited by browsable on 2019. 05. 31
 */
var NodeINIStdPay = {

  payForm: null,
  payFormId: null,
  paymentUrl: null,

  payFormData: {},

  init: function (options) {
    if (options == null || !options.paymentUrl) return console.log('Node Inicis 라이브러리를 초기화 할 수 없습니다. paymentUrl을 입력해주세요');

    window.NodeINIStdPay = NodeINIStdPay;

    this.paymentUrl = options.paymentUrl;

    // 결제에 사용되는 Form 추가
    this.payFormId = 'node-pay-' + new Date().getTime();

    this.payForm = document.createElement("form");
    this.payForm.setAttribute('method', "post");
    this.payForm.setAttribute('action', '');
    this.payForm.setAttribute('id', this.payFormId);
    this.payForm.setAttribute('style', 'display: none');
    this.payForm.setAttribute('accept-charset', 'euc-kr');

    document.getElementsByTagName('body')[0].appendChild(this.payForm);
  },

  pay: function (platform, params, error) {

    let payUrl;

    if (platform == 'mobile') {
      if (params.P_GOPAYMETHOD == 'card') {
        payUrl = 'https://mobile.inicis.com/smart/wcard/';
      } else if (params.P_GOPAYMETHOD == 'vbank') {
        payUrl = 'https://mobile.inicis.com/smart/vbank/';
      } else if (params.P_GOPAYMETHOD == 'bank') {
        payUrl = 'https://mobile.inicis.com/smart/bank/';
      } else if (params.P_GOPAYMETHOD == 'hpp') {
        payUrl = 'https://mobile.inicis.com/smart/mobile/';
      } else if (params.P_GOPAYMETHOD == 'culture') {
        payUrl = 'https://mobile.inicis.com/smart/culture/';
      } else if (params.P_GOPAYMETHOD == 'hpmn') {
        payUrl = 'https://mobile.inicis.com/smart/hpmn/';
      } else {
        payUrl = 'https://mobile.inicis.com/smart/wcard/';
      }
    } else {
      payUrl = `${this.paymentUrl}/desktop`;
    }
    window.NodeINIStdPay.mergeFormData(params);
    window.NodeINIStdPay.insertFormInput(true);
    this.payForm.setAttribute('action', payUrl);
    this.payForm.submit();
  },

  insertFormInput(removePre = false) {
    if (removePre) $(window.NodeINIStdPay.payForm).empty();

    Object.keys(this.payFormData).forEach(function (formKey) {
      var input = document.createElement('input');
      input.setAttribute('type', "text");
      input.setAttribute('name', formKey);
      input.setAttribute('value', window.NodeINIStdPay.payFormData[formKey]);
      window.NodeINIStdPay.payForm.appendChild(input);
    });
  },

  mergeFormData(source) {
    if (typeof source !== 'object') return;

    Object.keys(source).forEach(function (formKey) {
      window.NodeINIStdPay.payFormData[formKey] = source[formKey];
    });
  }
};