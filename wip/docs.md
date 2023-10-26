```ts
console.log(`figma: listen db change`);
logseq.DB.onChanged((evt) => {
  console.log(
    "figma:",
    evt,
    evt.txMeta,
    evt.txMeta?.outlinerOp,
    evt.txMeta?.outlinerOp != "saveBlock"
  );
  if (evt.txMeta?.outlinerOp != "saveBlock") return;
  console.log("figma: start find block");
  const figmaBlock = evt.blocks.find((e) =>
    e.content.trim().startsWith("https://www.figma.com/")
  );
  if (figmaBlock) {
    console.log("figma: find block", figmaBlock);
    logseq.Editor.insertBlock(
      figmaBlock.uuid,
      `{{renderer :figma, ${figmaBlock.content} }}`,
      {}
    );
  }
});
```
