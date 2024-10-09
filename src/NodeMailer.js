import nodemailer from 'nodemailer';

export const createTransporterImpl = config => nodemailer.createTransport(config)

export function sendMailImpl(message, transporter) {
  return function (onError, onSuccess) {
    transporter.sendMail(message, function (e, info) {
      if (e) {
        onError(e);
      } else {
        onSuccess(info);
      }
    });
    return function (_cancelError, _onCancelerError, onCancelerSuccess) {
      onCancelerSuccess();
    }
  }
}

export function createTestAccountImpl(onError, onSuccess) {
  nodemailer.createTestAccount(function (e, account) {
    if (e) {
      onError(e);
    } else {
      onSuccess(account);
    }
  });
  return function (_cancelError, _onCancelerError, onCancelerSuccess) {
    onCancelerSuccess();
  }
}

export const getTestMessageUrlImpl = info => nodemailer.getTestMessageUrl(info)
