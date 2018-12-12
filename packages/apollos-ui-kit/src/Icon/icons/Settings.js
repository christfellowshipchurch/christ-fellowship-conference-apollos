import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Path
      d="M18.9108 12.8764c0-.0527.0054-.0964.034-.2803.035-.224.0505-.369.0505-.554 0-.535-.0164-.745-.1206-1.054l-.0246-.062-.643.283.443.541 1.775-1.419.055-.048c.379-.374.441-.861.217-1.303l-.018-.034-1.69-2.921-.046-.0803-.066-.066c-.299-.295-.754-.4074-1.228-.2514l-.039.014-2.113.8345.262.646.44-.543c-.4042-.3196-.756-.516-1.562-.914l-.315.622.6965-.1053-.338-2.17-.697.106.668.22C14.895 3.602 14.2855 3 13.642 3h-3.3812c-.5353 0-1.127.4382-1.127 1.0294h.7044l-.6968-.102-.338 2.2535.6967.101-.222-.66c-.293.096-.565.233-.874.427-.16.101-.687.459-.731.488l.391.578.271-.642-2.029-.834-.048-.018c-.512-.169-.948-.025-1.312.335l-.066.065-.047.081-1.691 2.922.612.345-.498-.492c-.454.448-.24 1.08.169 1.484l.033.033.038.0283 1.775 1.3353.427-.5534h-.705c0 .053-.005.0967-.034.2806-.035.224-.05.3693-.05.554 0 .5354.0167.7457.121 1.0546l.669-.22-.443-.541-1.775 1.419-.055.049c-.379.3742-.44.861-.216 1.3035l.019.034 1.69 2.921.047.081.067.066c.299.295.754.408 1.228.252l.039-.014 2.113-.835-.2616-.646-.44.543c.404.32.756.516 1.562.914l.315-.622-.6966.106.338 2.17.696-.1055H9.22c0 .589.5207 1.0298 1.127 1.0298h3.3813c.5355 0 1.127-.438 1.127-1.03h-.704l.6966.106.338-2.17-.696-.106.315.622c.806-.3974 1.157-.594 1.562-.913l-.44-.543-.262.646 2.113.8343.261-.645-.315.622c.517.2557 1.1934.033 1.452-.478l-.63-.311.6115.3455 1.6907-2.9214.018-.034c.249-.491.174-1.1504-.4-1.434l-.315.622.402-.5707-1.944-1.3355-.402.571h.7045zm-1.4088 0v.3634l.3022.2075 1.944 1.3354.0418.0287.0455.0224c-.1554-.0767-.2346-.21-.2477-.3262-.005-.0438.0008-.0737.0172-.106l.63.311-.6115-.3452-1.6906 2.9212-.019.034c.089-.1766.259-.2324.438-.144l-.054-.0238-2.114-.8346-.381-.1505-.321.2532c-.3.236-.596.402-1.312.755l-.326.161-.056.355-.338 2.17-.009.052v.053c0-.279.112-.362.282-.362h-3.381c.127 0 .281.13.281.361v-.054l-.008-.053-.338-2.17-.0558-.3557-.326-.161c-.7157-.353-1.012-.518-1.312-.755l-.3206-.253-.381.1502-2.113.834.262.646-.2225-.66c.0393-.013.14.012.2137.0846l-.498.492.6116-.345-1.69-2.921-.6116.345.63-.311c.038.0754.0178.2377-.0473.302l-.498-.492.443.5406 1.775-1.419.379-.303-.1548-.4574c-.04-.117-.049-.232-.049-.615 0-.097.009-.183.034-.3424.041-.2638.0505-.3394.0505-.492v-.344l-.278-.209-1.773-1.335-.427.553.498-.492c-.005-.0047-.011-.015-.0097-.01.0083.0262.015.0622.013.115-.0045.1236-.053.2596-.173.3777l.067-.066.0464-.081 1.691-2.921-.611-.345.498.4917c.022-.021.019-.019-.011-.009-.052.017-.101.016-.118.01l.223-.66-.271.642 2.029.8345.348.143.314-.2064c.062-.041.571-.3874.706-.472.22-.138.394-.226.563-.2816l.411-.135.0635-.4226.338-2.2535.0075-.0505v-.05c0 .278-.113.3615-.282.3615h3.381c-.221 0-.429-.2053-.33-.498l-.054.1595.026.1662.338 2.17.0553.3554.326.161c.716.353 1.0125.5186 1.312.7555l.321.253.381-.151 2.113-.8345-.2613-.646.223.66c-.039.013-.14-.012-.2137-.0848l.498-.492-.611.345 1.69 2.9213.6117-.345-.63.311c-.0385-.0756-.018-.238.0472-.302l.498.492-.443-.541-1.775 1.419-.379.304.1542.458.0245.063c.015.054.024.1694.024.552 0 .097-.009.183-.034.343-.041.2637-.0508.339-.0508.492zm-5.5506 1.391c-1.217 0-2.254-1.024-2.254-2.2257 0-1.2016 1.037-2.2256 2.254-2.2256s2.254 1.024 2.254 2.226-1.037 2.226-2.254 2.226zm0 1.391c1.995 0 3.6628-1.6468 3.6628-3.6167 0-1.97-1.6678-3.6167-3.6628-3.6167-1.995 0-3.663 1.6468-3.663 3.6167 0 1.97 1.668 3.6167 3.663 3.6167z"
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
