import { defineComponent } from '~/utils';

export const VButton = defineComponent({
  name: 'VButton',

  // directives: { Ripple },

  setup() {
    return () => {
      return (
        <div>
          <button class="ml-4">hehe</button>
        </div>
      );
    };
  },
});

export type VButton = InstanceType<typeof VButton>;
