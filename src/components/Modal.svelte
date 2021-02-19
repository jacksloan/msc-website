<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fly } from "svelte/transition";
  import { expoInOut } from "svelte/easing";
  import Close from "svelte-feather-icons/src/icons/XIcon.svelte";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");
  let modal;
  const handle_keydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }
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
  const previously_focused =
    typeof document !== "undefined" && document.activeElement;
  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus();
    });
  }
</script>

<!-- see https://github.com/sveltejs/svelte/blob/master/site/content/examples/15-composition/04-modal/Modal.svelte -->
<svelte:window on:keydown={handle_keydown} />

<div
  transition:fly={{ y: 200, duration: 200, easing: expoInOut }}
  class="modal"
  role="dialog"
  aria-modal="true"
  bind:this={modal}
>
  <div class="modal-close text-black" on:click={close}>
    <Close size="48" />
  </div>
  <div class="modal-inner-content">
    <slot />
  </div>
</div>

<!-- see https://github.com/sveltejs/svelte/blob/master/site/content/examples/15-composition/04-modal/Modal.svelte -->
<style>
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    overflow: auto;
    background: white;
  }

  .modal-close {
    position: absolute;
    width: 6em;
    height: 6em;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 125ms;
  }

  .modal-close:hover {
    cursor: pointer;
    background-color: #eaeaea;
  }

  .modal-inner-content {
    max-width: 780px;
    margin: 6em auto 0;
  }
</style>
