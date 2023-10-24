import "@logseq/libs";

function main() {
  logseq.UI.showMsg("logseq-figma Plugin Loaded");

  logseq.Editor.registerSlashCommand("Figma", async () => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :figma, <figma_url> }}`
    );
    await logseq.Editor.cur;
  });

  logseq.App.onMacroRendererSlotted((p) => {
    const args = p.payload.arguments;
    if (arguments.length == 0) return;
    const type = args[0].trim();
    if (type != ":figma") return;
    const anchor = parent.document.getElementById(p.slot);
    if (!anchor) return;
    const blockParent = anchor.closest(".block-content.inline")?.parentElement;
    if (blockParent?.classList.contains("block-ref")) {
      blockParent.style.display = "block";
    }
    const renderered = anchor.childElementCount > 0;

    if (!args[1]?.startsWith("https://www.figma.com/")) {
      logseq.provideUI({
        key: `figma-${p.slot}`,
        slot: p.slot,
        template: `
        <div>
           Figma url is invalid
        </div>
        `,
        reset: true,
        style: { flex: 1 },
      });
    }
    if (!renderered) {
      anchor.style.width = "100%";
      const params = new URLSearchParams();
      params.append("url", args[1]);

      logseq.provideUI({
        key: `figma-${p.slot}`,
        slot: p.slot,
        template: `
        <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450"
            src="https://www.figma.com/embed?embed_host=logseq&${params.toString()}"
            allowfullscreen></iframe>
        `,
        reset: true,
        style: { flex: 1 },
      });
    }
  });
}

logseq.ready(main).catch(console.error);
