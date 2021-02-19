<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import { expoInOut } from "svelte/easing";
  import Close from "svelte-feather-icons/src/icons/XIcon.svelte";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
  let modal;
  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }
    // when modal is open, only tab between elements belonging to this modal
    if (e.key === "Tab") {
      // trap focus
      const nodes = modal.querySelectorAll("*");
      const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);
      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;
      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;
      tabbable[index].focus();
      e.preventDefault();
    }
  };

  // focus previous focus on modal close
  const hasPreviousFocus =
    typeof document !== "undefined" && document.activeElement;
  if (hasPreviousFocus) {
    onDestroy(() => {
      hasPreviousFocus.focus();
    });
  }
</script>

<!-- see https://github.com/sveltejs/svelte/blob/master/site/content/examples/15-composition/04-modal/Modal.svelte -->
<svelte:window on:keydown={handleKeydown} />

<div
  transition:fly={{ y: 200, duration: 200, easing: expoInOut }}
  class="fixed left-0 top-0 w-screen h-screen z-50 overflow-auto bg-white"
  role="dialog"
  aria-modal="true"
  bind:this={modal}
>
  <div class="max-w-3xl my-6 mx-auto p-4 md:p-0 relative">
    <button
      aria-label="close"
      class="absolute p-4 md:p-8 -mt-8 md:-mt-6 left-0 top-0 flex flex-row content-center justify-center text-black hover:cursor-pointer hover:bg-gray-300"
      on:click={close}
    >
      <Close size="48" />
    </button>
    <slot />
  </div>
</div>
