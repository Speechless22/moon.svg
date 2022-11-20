import React, { useEffect } from 'react';

import { debounce } from 'utils';
import { objectToQueryString } from 'utils/string';

import { FormProvider, useForm } from 'react-hook-form';
import ControlledLiveToggle from 'components/ControlledLiveToggle';

const DEFAULT_VALUES: FormValues = {
  liveMode: true,
  date: '',
  size: '',
  theme: 'basic',
  rotate: '0',
} as const;

type Props = {
  defaultValues?: FormValues;
  onChange: (v: FormValues) => void;
};

function MoonForm({ defaultValues = DEFAULT_VALUES, onChange }: Props) {
  const formMethods = useForm<FormValues>({
    defaultValues,
  });

  const { register, watch } = formMethods;

  const liveMode = watch('liveMode');

  useEffect(() => {
    const subscription = watch(
      debounce((values: FormValues) => {
        onChange(values);
      }, 100),
    );
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <FormProvider {...formMethods}>
      <ControlledLiveToggle name="liveMode" />
      {!liveMode && (
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input
            type="date"
            className="input input-bordered w-full max-w-xs"
            {...register('date')}
          />
        </div>
      )}
      <div className="form-control w-full max-w-xs">
        <label className="label" htmlFor="theme">
          <span className="label-text">Theme</span>
        </label>
        <select
          id="theme"
          className="select input-bordered w-full max-w-xs"
          {...register('theme')}
        >
          <option value="basic">Basic</option>
          <option value="ray">Ray</option>
        </select>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Rotate</span>
        </label>
        <input
          type="range"
          min="0"
          max="360"
          className="range"
          {...register('rotate')}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Size</span>
        </label>
        <input
          type="number"
          placeholder="100 (default)"
          className="input input-bordered w-full max-w-xs"
          {...register('size')}
        />
      </div>
    </FormProvider>
  );
}

export default MoonForm;