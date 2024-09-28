export function asyncError(fun) {
  return (req, res, next) => {
    fun(req, res, next).catch((err) => next(err));
  };
}
