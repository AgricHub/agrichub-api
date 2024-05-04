const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Step1Schema = new Schema({
  field1: {
    type: String,
    required: true,
  },
  field2: {
    type: String,
    required: true,
  },
});

const Step2Schema = new Schema({
  field3: {
    type: String,
    required: true,
  },
  field4: {
    type: String,
    required: true,
  },
});

const OnboardingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
  details: {
    step1: Step1Schema,
    step2: Step2Schema,
  },
}, { timestamps: true });

const Onboarding = mongoose.model('Onboarding', OnboardingSchema);

module.exports = Onboarding;
