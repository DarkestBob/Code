Swapping the contents of two variables using a temporary variable:

```python
glass1 = "milk"
glass2 = "juice"
temp = glass1
glass1 = glass2
glass2 = temp
```

After running this, `glass1` holds `"juice"` and `glass2` holds `"milk"`. The `temp` variable acts like an empty glass that lets you pour one into the other without losing anything.
